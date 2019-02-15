import puppeteer from 'puppeteer';

export default class ReleaseLinkScraper {
    /**
     *
     * @param {puppeteer.Browser} browser
     */
    static async create(browser) {
        const page = await browser.newPage();

        return new ReleaseLinkScraper(page);
    }

    constructor(page) {
        this._page = page;
        this._buffer = [];
    }

    /**
     * Scrapes all links from a specified page in the catalogue
     *
     * @param {number} page A non-negative number bigger than 0
     */
    async scrape(page = 1) {
        await Promise.all([
            this._page.goto(`https://www.monstercat.com/music?Page=${page}`),
            this._page.waitForNavigation({ waitUntil: 'networkidle0' }),
            this._page.waitForSelector('section[role="content"] ul.art-list'),
        ]);

        return this._page.evaluate(() =>
            [
                ...document.querySelectorAll(
                    'section[role="content"] ul.art-list li:not(.in-early-access) a',
                ),
            ].map(element => element.href),
        );
    }
}
