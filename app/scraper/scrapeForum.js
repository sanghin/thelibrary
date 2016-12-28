const xray = require('x-ray')();
const urls = require('../utils/urls.js');
const postSchema = require('./postschema.js');

const cleanPost = (post) => {
    return Object.assign({}, post, {
        title: post.title.replace(/\r?\n|\r/g, '').trim(),
        postedBy: post.postedBy.replace(/<img[^>]*>/g, '')
    });
};

const shapeForumResults = (forumTitle, posts) => {
    return {
        forumTitle,
        posts: [ ...posts.map(cleanPost) ]
    };
};

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
}

module.exports = {
    scrapeForum,
    cleanPost
};