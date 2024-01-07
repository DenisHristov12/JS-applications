const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const url = "http://localhost:5500/Advanced/JSApplications/ArchitectureAndTesting/BookLibraryTests/index.html";

describe("E2E Tests", () => {
    let browser, page;

    before(async () => {
        browser = await chromium.launch();
    });
    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage(); 
    });
    afterEach(async () => {
        page.close();
    });
    
    describe("Screenshot", function () {
        it("Should make screenshot", async function () {
            await page.goto(url);
            await page.screenshot({path: "index.png"});
        });
    });


    describe("Load books", function () {
        it("Should load all books collection", async function () {
            await page.goto(url);
            
            await page.waitForSelector('#loadBooks');
            await page.click('#loadBooks');

            const books = await page.$$eval(`tbody tr`, (tr) => {
                tr.map((s) => s.textContent);
            });

            
        });
    });
});