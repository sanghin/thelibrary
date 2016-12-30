const fs = require('fs');
const {scrapers} = require('./scraper/scrapers.js');
const pg = require('pg');

let config = {
    user: 'poe_scraper',
    database: 'postgres',
    password: '!!1234poe',
    host: 'localhost',
    port: 5531,
    max: 10,
    idleTimeoutMillis: 30000
};
let pool = new pg.Pool(config);

const writePostsToDb = ({forumTitle, posts}) => {
    if (!Array.isArray(posts) || !forumTitle) throw new TypeError('Expected posts to be Array and forumTitle to be defined');

    let threadIds = posts.map(p => p.threadId);
    pool.connect((err, client, done) => {
        if (err) return console.error('error fetching client from pool', err);

        let postsToUpdate = [];
        let postsToInsert = [];
        let sqlQuery = `
            SELECT 
            thread_id AS threadId, 
            title, 
            forum_title AS forumTitle, 
            url, 
            creator AS postedBy, 
            body, 
            created_date AS createDate, 
            updated_date AS updateDate 
            FROM poe.Post WHERE thread_id IN ($1:csv)
        `;
        client.query(sqlQuery, threadIds, (err, result) => {
            done();
            if (err) return console.error('error running query', err);
            postsToUpdate = posts.filter(ep => result.rows.find(p => p.threadId === ep.threadId && ep.updateDate < p.updateDate));
            postsToCreate = posts.filter(p => result.rows.every(ep => ep.threadId !== p.threadId));
            updatePosts(postsToUpdate, forumTitle);
            insertPosts(postsToInsert, forumTitle);
        });
    });

    pool.on('error', (err, client) => {
        console.error(`idle client error: ${err.message}`, client, err.stack)
    });
};

const updatePosts = (posts, forumTitle) => {
    if (!Array.isArray(posts) || posts.length <= 0) throw new Error('Expected posts to be Array with contents.');
    pool.connect((err, client, done) => {
        if (err) return console.error('error fetching client from pool', err);
        let sqlQuery = `
            UPDATE poe.Post SET
            creator = $1, 
            title = $2,
            url = $3,
            body = $4,
            updated_date = $5,
            forum_title = $6
            WHERE thread_id = $7
        `;
        posts.map(p => client.query(sqlQuery, [
            p.postedBy,
            p.title,
            p.url,
            p.body,
            p.updateDate,
            forumTitle
        ], (err, result) => {
            done();
            if (err) return console.error('error running query', err);
            console.info(result);
        }));
    });

    pool.on('error', (err, client) => {
        console.error(`idle client error: ${err.message}`, client, err.stack)
    });
};

const insertPosts = (posts, forumTitle) => {

};

const writePostCollectionToDb = (postCollection) => {
    if (!Array.isArray(postCollection)) throw new TypeError(`Expected postCollection to be Array, received ${typeof posts}`);
    postCollection.map(writePostsToDb);
};


let postPromises = scrapers.map(s => s.scrapePromise(s.id, s.name));

Promise
    .all(postPromises)
    //.then(writePostCollectionToDb)
    .then(posts => fs.writeFile('./results.json', JSON.stringify(posts, null, 2)))
    .catch(err => {
        console.error('ERROR!');
        console.error(err);
    });