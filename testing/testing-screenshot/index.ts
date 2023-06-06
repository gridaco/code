import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

interface ScreenshotOptions {
  htmlcss: string;
  viewport: {
    width: number;
    height: number;
  };
}

export async function screenshot({ htmlcss, viewport }: ScreenshotOptions) {
  const worker = new Worker({});
  await worker.launch();
  const buffer = worker.screenshot({ htmlcss, viewport });
  await worker.terminate();
  return buffer;
}

export class Worker {
  private browser: Browser;
  private page: Page;
  private readonly options;

  constructor({ options }: { options?: PuppeteerLaunchOptions }) {
    this.browser = null;
    this.page = null;
    this.options = options ?? {
      headless: "new",
      args: ["--no-sandbox"],
      ignoreDefaultArgs: ["--disable-extensions"],
    };
  }

  async launch() {
    if (this.browser) {
      return this.browser;
    }
    this.browser = await puppeteer.launch(this.options);
    this.page = await this.browser.newPage();
    return this.browser;
  }

  async relaunch() {
    await this.close();
    return this.launch();
  }

  async screenshot({ htmlcss, viewport }: ScreenshotOptions) {
    // check if page is available (try to avoid TargetClosedError)
    if (!this.page || this.page.isClosed()) {
      await this.relaunch();
    }

    this.page.setViewport(viewport);
    await this.page.setContent(htmlcss, { waitUntil: "networkidle0" });
    const buffer = await this.page.screenshot({
      type: "png",
      // support transparency
      omitBackground: true,
    });
    return buffer;
  }

  async close() {
    try {
      await this.browser.close();
    } catch (e) {}
    this.browser = null;
    this.page = null;
  }

  terminate() {
    this.close();
  }
}
