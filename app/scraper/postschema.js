/**
 * Defines that we want an array of objects using the following selectors to populate their data.
 */
const postSchema = [{
    title: '.title a@html',
    url: '.title a@href',
    threadId: '.setReadButton@data-id',
    postedBy: '.profile-link a@html'
}];

module.exports = postSchema;