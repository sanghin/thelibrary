const xray = require('x-ray')();
const urls = require('../utils/urls');
const postSchema = require('./postschema');
const { shapeForumResults } = require('../utils/postutils');


const scrapeForum = (forumId, forumTitle) => {

    const scope = 'td.thread';
    const scrapeUrl = `${urls.base}${urls.forum}${forumId}`;
    let xQuery = xray(scrapeUrl, scope, postSchema);

    return new Promise((resolve, reject) => {
        xQuery((err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(shapeForumResults(forumTitle, results));
            }
        });
    });
};

module.exports = {
    scrapeForum
};