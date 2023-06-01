import puppeteer from "puppeteer";

interface ScreenshotOptions {
  htmlcss: string;
  viewport: {
    width: number;
    height: number;
  };
}

export async function screenshot({ htmlcss, viewport }: ScreenshotOptions) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });
  const page = await browser.newPage();
  page.setViewport(viewport);
  await page.setContent(htmlcss, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();
  return buffer;
}
