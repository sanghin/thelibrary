'use strict';

const cleanPost = post => {
  return Object.assign({}, post, {
    title: post.title.replace(/\r?\n|\r/g, '').trim(),
    postedBy: post.postedBy.replace(/<img[^>]*>/g, '').trim(),
  });
};

const shapeForumResults = (forumTitle, posts) => {
  return {
    forumTitle,
    posts: [...posts.map(cleanPost)],
  };
};

module.exports = {
  cleanPost,
  shapeForumResults,
};
