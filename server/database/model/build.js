const bookshelfInstance = require('../bookshelf').default;

const Build = bookshelfInstance.model('Build', {
  tableName: 'build',
});

module.exports = Build;
