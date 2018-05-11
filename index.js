const puppeteer = require('puppeteer');
 
(async () => {
 
    /* Passo 1: Na coluna Filmes, abra o Card Vingadores, e salve os heróis que ainda não foram marcados. Feche o card. */
 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://trello.com/b/dzRmQJgA/weeseg-sele%C3%A7%C3%A3o');
    await Promise.all([
        page.click('#board > div:nth-child(1) > div > div.list-cards.u-fancy-scrollbar.u-clearfix.js-list-cards > a:nth-child(1) > div.list-card-details'),
        page.waitForNavigation({
            waitUntil: 'networkidle0'
        })
    ]);
    await page.evaluate(() => {
        let avengers = document.querySelectorAll('.checklist-item');
        for (let i = 0; i < avengers.length; i++) {
            avengers[i].classList.add('checklist-item-state-complete')
        }
        document.querySelector('.dialog-close-button').click();
    });
 
    /* Passo 1: Na coluna Filmes, abra o Card Matrix, e salve a descrição do Card. Feche o card. */
 
    await Promise.all([
        page.click('#board > div:nth-child(1) > div > div.list-cards.u-fancy-scrollbar.u-clearfix.js-list-cards > a:nth-child(2) > div.list-card-details'),
        page.waitForNavigation({
            waitUntil: 'networkidle0'
        })
    ]);
 
    await page.evaluate(() => {
        let description = Array.from(document.querySelectorAll('.js-card-desc'));
        description[0].textContent = 'Bárbara na área ;)';
    })
 
    /* Passo 2: Na coluna Programação, abra o card Fuse, vá até comentários, e clique no link para o card Linguagens. */
 
    await page.goto('https://trello.com/b/dzRmQJgA/weeseg-sele%C3%A7%C3%A3o');
 
    await Promise.all([
        page.click('#board > div:nth-child(2) > div > div.list-cards.u-fancy-scrollbar.u-clearfix.js-list-cards > a:nth-child(2) > div.list-card-details'),
        page.waitForNavigation({
            waitUntil: 'networkidle0'
        })
    ]);
   
    /* Resultado em ScreenShot */
 
    await page.screenshot({
        path: 'example.png'
    });
 
    /* Finalizando rotina */
 
    await browser.close();
})();
