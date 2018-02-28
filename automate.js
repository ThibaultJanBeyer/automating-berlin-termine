const emailController = require('./email.controller');
const puppeteer = require('puppeteer');

let browser, selector, errorMessage;

require('es6-promise').polyfill();
require('isomorphic-fetch');

// ##
// # This program visits Redbubble and uploads shirts with the specified data
// ##

// #########
// # SETUP #
// #########

const website = process.argv[2] || "https://service.berlin.de/terminvereinbarung/termin/tag.php?termin=1&dienstleister=327795&anliegen[]=318961&herkunft=1";
console.log(process.argv[2]);
// #########
// # START #
// #########

function start() {
  console.log('START');

  (async () => {

    const width = 800, height = 900;
    const chrome = { x: 0, y: 74 };   // comes from config in reality

    browser = await puppeteer.launch({headless: false, slowMo: 250,
        args: [ `--window-size=${ width+chrome.x },${ height+chrome.x }` ]});
    
    const page = await browser.newPage();
    await page.goto(website);
    page.setViewport({ width, height });
    
    // see https://stackoverflow.com/a/47003069/3712591
    const check = async selector => {
        // await page.waitFor(selector);??
        if(await page.$(selector) !== null) {
            console.log(`${selector} => found`);
            return selector;
        } else {
            console.log(`${selector} => not found`);
            return false;
        }
    };

    const recursion = async function myself( ) {

        console.log("trying to find appointment!");

        if( await check(".calendar-month-table .buchbar") ) {

            console.log("!!!!!! found appointment !!!!!!");
            emailController(website);
            finished();
        
        } else if( await check(".collapsible-body a:not(*[title])") ) {
        
            console.log("no appointment found, checking next page :(");
            await page.click( await check(".collapsible-body a:not(*[title])") );
            setTimeout(() => myself(), 5000);
        
        } else {
        
            console.log("end of page, try again! :(");
            await page.goto(website);
            setTimeout(() => myself(), 5000);
        
        }

    };

    recursion();

    // Finished
    //////////////////////////////////////////////////////////////////////////////

    function finished() {
        browser.close();
        console.log("END");
    }

  })();

}

start();
