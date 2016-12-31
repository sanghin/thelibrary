const xray = require('x-ray')();
const urls = require('../utils/urls');
const { postSchema, bodySchema } = require('./postschema');
const { shapeForumResults } = require('../utils/postutils');


const scrapeForum = (forumId, forumTitle) => {

    const scope = 'td.thread';
    const scrapeUrl = `${urls.base}${urls.forum}${forumId}`;
    let desiredSchema = [
        ...postSchema
    ];
    // desiredSchema[0].content = xray(desiredSchema[0].url, '.content-container:nth-of-type(1)', bodySchema);
    // console.log(desiredSchema);
    // console.log(bodySchema);

    let xQuery = xray(scrapeUrl, scope, desiredSchema);

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