'use strict';

const fs = require('fs');
const { scrapers } = require('./scraper/scrapers.js');
const pg = require('pg');

let pool = new pg.Pool({ connectionString: process.env.PG_CONNECTION_STRING });

const writePostsToDb = ({ forumTitle, posts }) => {
  if (!Array.isArray(posts) || !forumTitle) {
    throw new TypeError('Expected posts to be Array and forumTitle to be defined');
  }

  const threadIds = posts.map(p => p.threadId);
  pool.connect((err, client, done) => {
    if (err) return console.error('error fetching client from pool', err);

    let postsToUpdate = [];
    let postsToInsert = [];
    const sqlQuery = `
            SELECT 
            thread_id AS threadId, 
            title, 
            forum_title AS forumTitle, 
            url, 
            creator AS postedBy, 
            body, 
            created_date AS createDate, 
            updated_date AS updateDate 
            FROM poe."Post" WHERE thread_id = ANY ($1)
        `;
    client.query(sqlQuery, [threadIds], (err, result) => {
      done();
      if (err) return console.error('error running query', err);
      postsToUpdate = posts.filter(
        ep => result.rows.filter(p => p.threadId === ep.threadId && ep.updateDate < p.updateDate).length > 0
      );
      postsToInsert = posts.filter(p => result.rows.filter(ep => ep.threadId === p.threadId).length <= 0);
      updatePosts(postsToUpdate, forumTitle);
      insertPosts(postsToInsert, forumTitle);
    });
  });

  pool.on('error', (err, client) => {
    console.error(`idle client error: ${err.message}`, client, err.stack);
  });
};

const updatePosts = (posts, forumTitle) => {
  if (!Array.isArray(posts) || posts.length <= 0) return;
  pool.connect((err, client, done) => {
    if (err) return console.error('error fetching client from pool', err);
    const sqlQuery = `
            UPDATE poe."Post" SET
            creator = $1, 
            title = $2,
            url = $3,
            body = $4,
            updated_date = $5,
            forum_title = $6
            WHERE thread_id = $7
        `;
    posts.map(p =>
      client.query(
        sqlQuery,
        [p.postedBy, p.title, p.url, p.body, p.updateDate || new Date(), forumTitle],
        (err, result) => {
          done();
          if (err) return console.error('error running query', err);
        }
      )
    );
  });
};

const insertPosts = (posts, forumTitle) => {
  if (!Array.isArray(posts) || posts.length <= 0) return;
  pool.connect((err, client, done) => {
    if (err) return console.error('error fetching client from pool', err);
    const sqlQuery = `
            INSERT INTO poe."Post" 
            (creator, title, url, body, updated_date, created_date, forum_title, thread_id) VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
    posts.map(p =>
      client.query(
        sqlQuery,
        [p.postedBy, p.title, p.url, p.body, p.updateDate || new Date(), p.createDate, forumTitle, p.threadId],
        (err, result) => {
          done();
          if (err) return console.error('error running query', err);
        }
      )
    );
  });
};

const writePostCollectionToDb = postCollection => {
  if (!Array.isArray(postCollection)) {
    throw new TypeError(`Expected postCollection to be Array, received ${typeof posts}`);
  }
  postCollection.map(p => writePostsToDb(p));
};

let postPromises = scrapers.map(s => s.scrapePromise(s.id, s.name));

Promise.all(postPromises)
  .then(posts => {
    writePostCollectionToDb(posts);
    fs.writeFile('./results.json', JSON.stringify(posts, null, 2));
  })
  .catch(err => {
    console.error('ERROR!');
    console.error(err);
  });
