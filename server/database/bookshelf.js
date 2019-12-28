import bookshelf from 'bookshelf';
import knexInstance from './connection';

let bookshelfInstance;

if (!bookshelfInstance) {
  bookshelfInstance = bookshelf(knexInstance);
}

export default bookshelfInstance;
