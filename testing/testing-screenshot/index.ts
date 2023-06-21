import os from "os";
import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

interface ScreenshotOptions {
  htmlcss: string;
  viewport: {
    width: number;
    height: number;
  };
  path?: string;
}

export class Worker {
  private browser: Browser;
  private pages: Page[] = [];
  private pageInUse: boolean[] = [];
  private maxPages: number;
  private readonly options: PuppeteerLaunchOptions;

  constructor(
    options: PuppeteerLaunchOptions = {},
    // not the best way to determine max pages, but it's a start
    maxPages: number = os.cpus().length * 2
  ) {
    this.maxPages = maxPages;
    this.options = {
      headless: "new",
      args: ["--no-sandbox"],
      ignoreDefaultArgs: ["--disable-extensions"],
      ...options,
    };
  }

  async launch() {
    this.browser = await puppeteer.launch(this.options);
    (await this.browser.pages()).forEach((page) => {
      this.pages.push(page);
      this.pageInUse.push(false);
    });
  }

  async allocatePage() {
    let pageIndex = this.pageInUse.findIndex((inUse) => !inUse);
    if (pageIndex === -1) {
      if (this.pages.length < this.maxPages) {
        const newPage = await this.browser.newPage();
        this.pages.push(newPage);
        this.pageInUse.push(true); // The new page will be in use immediately
        pageIndex = this.pages.length - 1;
      } else {
        // Wait for a page to be available
        while (pageIndex === -1) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Poll every 100ms
          pageIndex = this.pageInUse.findIndex((inUse) => !inUse);
        }
      }
    }
    this.pageInUse[pageIndex] = true; // Mark the page as in use
    return this.pages[pageIndex];
  }

  async screenshot(options: ScreenshotOptions) {
    const page = await this.allocatePage();

    await page.setViewport(options.viewport);
    await page.setContent(options.htmlcss, { waitUntil: "networkidle0" });
    const buffer = await page.screenshot({
      type: "png",
      omitBackground: true,
      path: options.path,
    });

    // clear the page after use
    page.setContent("", { timeout: 1000 }).finally(() => {
      this.pageInUse[this.pages.indexOf(page)] = false; // Mark the page as no longer in use
    });

    return buffer;
  }

  async terminate() {
    await Promise.all(this.pages.map((page) => page.close()));
    await this.browser.close();
  }
}

export async function screenshot(options: ScreenshotOptions) {
  const worker = new Worker();
  await worker.launch();
  const buffer = await worker.screenshot(options);
  await worker.terminate();
  return buffer;
}
