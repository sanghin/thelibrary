'use strict';

/**
 * Defines that we want an array of objects using the following selectors to populate their data.
 */
const postSchema = [
  {
    title: '.title a@html',
    url: '.title a@href',
    threadId: '.setReadButton@data-id',
    postedBy: '.profile-link a@html',
    createDate: '.post_date@html',
  },
];

const bodySchema = {
  body: '.content-container:nth-of-type(1) .content@html',
  updatedDate: '.last_edited_by@html',
};

module.exports = {
  postSchema,
  bodySchema,
};
