const puppeteer = require('puppeteer');

var enlances;
(async () => {

  var browser2 = await puppeteer.launch({ headless: false });
  var page = await browser2.newPage();


  let Gettask = async (urls, browser2, page) => {
    browser2 = await puppeteer.launch({ headless: false });
    page = await browser2.newPage();
    await page.goto(urls);

    await page.waitForSelector('div.list-cards.u-fancy-scrollbar.js-list-cards.has-margin-bottom');

    enlances = await page.evaluate(() => {
      const elements = document.querySelectorAll('div.u-fancy-scrollbar  a > div.list-card-details.js-card-details > span');

      const links = [];
      for (let element of elements) {
        links.push(element.textContent + "\n");
      }

      return links;

    });

  }



  let Addtask = async (urls) => {
    browser2 = await puppeteer.launch({ headless: false });
    page = await browser2.newPage();
    await page.goto(urls, { waitUntil: 'load', timeout: 0 });
    const hrefs1 = await page.evaluate(() => {
      document.querySelector('div.ALjV_FDtdiJ2rGCAH1Lg.Frz0pvOJ0fp95qyyJfFZ > div > ul  button').setAttribute("id", "loginn")

      document.querySelector('div.eFIWyCm6fiCLErdXino2 > div > div > div > div > div a').setAttribute("id", "login")

      return Array.from(
        document.querySelectorAll('div.eFIWyCm6fiCLErdXino2 > div > div > div > div > div > a[href]'),
        a => a.getAttribute('href')
      )
    });

    await page.click('#loginn');
    await page.click('#login');

    await Promise.all([
      page.waitForNavigation()
    ]);

    let url = await page.url();

    await page.evaluate(() => {
      document.querySelector('form > div > div div > input').setAttribute("id", "email")
    });
    await page.click('#email');
    await page.type('#email', 'pabloagncat@gmail.com');
    await page.click('#element-3');
    await page.type('#element-3', 'Prueba_22');
    await page.click('[data-gtm-id="start-email-login"]');

    for (i = 0; i <= 4; i++) {

      setTimeout(async () => {
        await page.waitForSelector('#top_bar_inner');
        await page.keyboard.press('q');
        await page.waitForSelector('[data-testid="task-editor-action-buttons"]');
        await page.type('[data-placeholder="Task name"]', enlances[i]);

        setTimeout(async () => {

          await page.waitForSelector('[data-testid="task-editor-action-buttons"]');
          await page.click('[type="submit"]');

        }, "2000");

      }, "6000");


    }
    await page.waitForSelector('.public-DraftEditor-content');
  }



Gettask('https://trello.com/b/QvHVksDa/personal-work-goals');
Addtask('https://todoist.com')

await browser2.close();
})();


