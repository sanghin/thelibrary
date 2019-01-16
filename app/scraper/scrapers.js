const urls = require('../utils/urls.js');
const { scrapeForum } = require('./scrapeForum.js');

let propNames = Object.getOwnPropertyNames(urls.classes);
let scrapers = propNames.map(p => {
  return {
    name: p,
    id: urls.classes[p],
    scrapePromise: scrapeForum,
  };
});

module.exports = {
  scrapers,
};
