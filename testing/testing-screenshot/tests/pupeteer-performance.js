const puppeteer = require("puppeteer");
const tmp = require("tmp");
const path = require("path");

const url = "https://example.com"; // Replace with your test URL

const takeScreenshot = async (page, filename) => {
  await page.goto(url);
  await page.screenshot({ path: filename });
};

const measureConcurrency = async (concurrency, tmpDir) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const pages = await Promise.all(
    Array(concurrency)
      .fill()
      .map(() => browser.newPage())
  );

  const start = Date.now();

  const promises = pages.map((page, i) =>
    takeScreenshot(
      page,
      path.join(tmpDir, `screenshot_${concurrency}_${i}.png`)
    )
  );

  await Promise.all(promises);

  const duration = Date.now() - start;
  const averageDuration = duration / concurrency;

  await browser.close();

  return averageDuration;
};

const testConcurrencies = async (tmpDir) => {
  let concurrency = 1;
  let lastAverageDuration = Infinity;
  let optimalConcurrency;
  let optimalAverageDuration = Infinity;

  let increaseCount = 0;
  const maxIncreases = 5; // Number of increases to allow before stopping

  while (true) {
    const averageDuration = await measureConcurrency(concurrency, tmpDir);
    console.log(
      `Tested concurrency ${concurrency}: ${Math.ceil(
        averageDuration
      )}ms per page`
    );

    if (averageDuration < optimalAverageDuration) {
      optimalConcurrency = concurrency;
      optimalAverageDuration = averageDuration;
    }

    // If average duration per page starts increasing, increment the counter
    if (averageDuration > lastAverageDuration) {
      increaseCount++;
    }

    // Stop if we've seen increases in average duration maxIncreases times
    if (increaseCount >= maxIncreases) {
      break;
    }

    lastAverageDuration = averageDuration;
    concurrency++;
  }

  console.log(
    `Optimal concurrency for this run is ${optimalConcurrency}: ${Math.ceil(
      optimalAverageDuration
    )}ms per page`
  );

  return optimalConcurrency;
};

async function test() {
  const testRuns = 5; // Number of times to run the entire test
  const optimalConcurrencies = [];

  for (let i = 0; i < testRuns; i++) {
    console.log(`Running test ${i + 1} of ${testRuns}`);
    const tmpDir = tmp.dirSync({ unsafeCleanup: true }); // Create a new temporary directory
    optimalConcurrencies.push(await testConcurrencies(tmpDir.name));
    tmpDir.removeCallback(); // Clean up the temporary directory
  }

  const counts = optimalConcurrencies.reduce((acc, concurrency) => {
    acc[concurrency] = (acc[concurrency] || 0) + 1;
    return acc;
  }, {});

  const mostCommonConcurrency = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  console.log(
    `Most commonly observed optimal concurrency is ${mostCommonConcurrency}`
  );
}

if (require.main === module) {
  test();
}
