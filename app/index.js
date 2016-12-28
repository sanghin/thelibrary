const urls = require('./utils/urls.js');
const scrapeForum = require('./scraper/scrapeForum.js');
const fs = require('fs');

let marauderScraper = scrapeForum(urls.marauder);

let posts = [];
marauderScraper((err,obj) => {
    posts = obj.map(p => {
        p.title = p.title.replace(/\r?\n|\r/g,'').trim();
        p.postedBy = p.postedBy.replace(/<img[^>]*>/g,"");
        return p;
    });
    fs.writeFile('./results.json', JSON.stringify(posts, null, 2), (e) => console.log(e || 'Writing to results.json')); 
});