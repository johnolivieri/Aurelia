import { computedFrom, bindable } from 'aurelia-framework';

import { BookModel } from './../../models/book-model';

export class BookStats {
  @bindable books: BookModel[];
  @bindable originalNumberOfBooks: number;

  @computedFrom('originalNumberOfBooks', 'books.length')
  get addedBooks() {
    return this.books.length - this.originalNumberOfBooks;
  }
}
