const bookshelf = require('../bookshelf');

const Build = bookshelf.model('Build', {
  tableName: 'build',
});

module.exports = Build;
