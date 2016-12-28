const xray = require('x-ray')();
const urls = require('../utils/urls.js');

const scrapeForum = (forumId) => {

    const selector = 'td.thread';
    const scrapeUrl = `${urls.base}${urls.forum}${forumId}`

    return xray(scrapeUrl, selector, [{
        title: '.title a@html',
        url: '.title a@href',
        threadId: '.setReadButton@data-id',
        postedBy: '.profile-link a@html'
    }]);
}

module.exports = scrapeForum;