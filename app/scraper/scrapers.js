const urls = require('../utils/urls.js');
const { scrapeForum } = require('./scrapeForum.js');

let scrapers = [];
for (let key in Object.getOwnPropertyNames(urls.classes)) {
    scrapers.push({
        name: key,
        id: urls.classes[key],
        scrapePromise: scrapeForum
    });
}

module.exports = {
    scrapers
};