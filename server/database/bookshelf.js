import bookshelf from 'bookshelf';
import db from './db';

let bookshelfInstance;

if (!bookshelfInstance) {
  bookshelfInstance = bookshelf(db);
}

export default bookshelfInstance;
