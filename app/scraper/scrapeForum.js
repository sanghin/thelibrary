'use strict';

// http://reustle.org/simple-site-scraping-with-nodejs-and-jsdom

const fetch = require('node-fetch');

// const urls = require('../utils/urls');
// const { postSchema } = require('./postschema');
// const { shapeForumResults } = require('../utils/postutils');

// request({uri: req_url}, function(error, response, body){
// 	if(!error && response.statusCode == 200){
// 		var window = jsdom.jsdom(body).createWindow();

// 		var temp = window.document.getElementsByClassName('u-eng')[0].innerHTML;
// 		console.log(temp);
// 	}
// });

const scrapeForum = async (forumId, forumTitle) => {
  const response = await fetch('https://www.pathofexile.com/forum/view-forum/40');

  console.log(`@@@`, response);
  // const scope = 'td.thread';
  // const scrapeUrl = `${urls.base}${urls.forum}${forumId}`;
  // let desiredSchema = [...postSchema];
  // desiredSchema[0].content = xray(desiredSchema[0].url, '.content-container:nth-of-type(1)', bodySchema);
  // console.log(desiredSchema);
  // console.log(bodySchema);
  // let xQuery = xray(scrapeUrl, scope, desiredSchema);
  // return new Promise((resolve, reject) => {
  //   xQuery((err, results) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(shapeForumResults(forumTitle, results));
  //     }
  //   });
  // });
};

module.exports = {
  scrapeForum,
};
