import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

interface ScreenshotOptions {
  htmlcss: string;
  viewport: {
    width: number;
    height: number;
  };
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
    try {
      if (!this.browser || !this.page || this.page.isClosed()) {
        await this.relaunch();
      }
      await this.page.setViewport(viewport);
      await this.page.setContent(htmlcss, { waitUntil: "networkidle0" });
      const buffer = await this.page.screenshot({
        type: "png",
        // support transparency
        omitBackground: true,
      });
      return buffer;
    } catch (error) {
      console.log(`Failed to take screenshot: ${error.message}`);
      await this.relaunch();
      // After relaunch, retry taking screenshot or rethrow the error
      return this.screenshot({ htmlcss, viewport });
    }
  }

  async close() {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (e) {
        console.log(`Failed to close browser: ${e.message}`);
      }
      this.browser = null;
      this.page = null;
    }
  }

  terminate() {
    this.close();
  }
}

export async function screenshot(options: ScreenshotOptions) {
  const worker = new Worker({});
  await worker.launch();
  const buffer = await worker.screenshot(options);
  await worker.terminate();
  return buffer;
}
