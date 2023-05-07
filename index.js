const puppeteer = require('puppeteer');

var linksArray=[];

(async () => {

  var browser = await puppeteer.launch({ headless: false });
  var page = await browser.newPage();


  let Gettask = async (urls, browser, page) => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(urls);

    await page.waitForSelector('div.list-cards.u-fancy-scrollbar.js-list-cards.has-margin-bottom');

    linksArray = await page.evaluate(() => {
      const elements = document.querySelectorAll('div.u-fancy-scrollbar  a > div.list-card-details.js-card-details > span');

      const links = [];
      for (let element of elements) {
        links.push(element.textContent + "\n");
      }

      return links;

    });

  }



  let Addtask = async (urls) => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(urls, { waitUntil: 'load', timeout: 0 });
    await page.evaluate(() => {
      document.querySelector('div.ALjV_FDtdiJ2rGCAH1Lg.Frz0pvOJ0fp95qyyJfFZ > div > ul  button').setAttribute("id", "menu_option")

      document.querySelector('div.eFIWyCm6fiCLErdXino2 > div > div > div > div > div a').setAttribute("id", "login")

      return Array.from(
        document.querySelectorAll('div.eFIWyCm6fiCLErdXino2 > div > div > div > div > div > a[href]'),
        a => a.getAttribute('href')
      )
    });

    await page.click('#menu_option');
    await page.click('#login');

    await Promise.all([
      page.waitForNavigation()
    ]);

  await page.url();

    await page.evaluate(() => {
      document.querySelector('form > div > div div > input').setAttribute("id", "email")
    });
    await page.click('#email');
    await page.type('#email', 'pabloagncat@gmail.com');
    await page.click('#element-3');
    await page.type('#element-3', 'Prueba_22');
    await page.click('[data-gtm-id="start-email-login"]');

    for (i = 0; i <= 0; i++) {

      setTimeout(async () => {
        await page.waitForSelector('#top_bar_inner');
        await page.keyboard.press('q');
        await page.waitForSelector('[data-testid="task-editor-action-buttons"]');
        await page.type('[data-placeholder="Task name"]', linksArray[i]);

        setTimeout(async () => {

          await page.waitForSelector('[data-testid="task-editor-action-buttons"]');
          await page.click('[type="submit"]');

        }, "3500");

      }, "6000");


    }
    await page.waitForSelector('.public-DraftEditor-content');
  }

  Gettask('https://trello.com/b/QvHVksDa/personal-work-goals');
  Addtask('https://todoist.com')
  
  await browser.close();
  })();
  