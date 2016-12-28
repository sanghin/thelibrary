const fs = require('fs');
const Q = require('q');
const urls = require('./utils/urls.js');
const { scrapers } = require('./scraper/scrapers.js');

let postPromises = scrapers.map(s => s.scrapePromise(s.id, s.name));

Promise
  .all(postPromises)
  .then(posts => fs.writeFile('./results.json', JSON.stringify(posts, null, 2)))
  .catch(err => { console.error('ERROR!'); console.error(err); });