let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet"
    );
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg"; //btn-mktg btn-large-mktg btn-muted-mktg
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 10000);
});

describe("Task number 2", () => {
  afterEach(() => {
    page.close();
  });

  test("Copilot", async () => {
    await page.goto("https://github.com/features/copilot");
    const title = await page.title();
    expect(title).toContain("GitHub Copilot · Your AI pair programmer");
  }, 10000);

  test("Documets", async () => {
    await page.goto("https://docs.github.com/ru");
    const title = await page.title();
    expect(title).toContain("GitHub Docs");
  }, 10000);

  test("Pricing", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer");
  }, 10000);
});
