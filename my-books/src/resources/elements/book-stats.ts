import { computedFrom, bindable } from 'aurelia-framework';

import { Book } from './../../models/book';

export class BookStats {
  @bindable books: Book[];
  @bindable originalNumberOfBooks: number;

  @computedFrom('originalNumberOfBooks', 'books.length')
  get addedBooks() {
    return this.books.length - this.originalNumberOfBooks;
  }
}
