const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.wsj.com/market-data/stocks/marketsdiary';

const test = async () => {
  try {
    const html = await rp(url);
    const $ = cheerio.load(html)
    const table = $('table')  

    console.log($)
  } catch (error) {
    console.log(error)
  }
  
}


test();