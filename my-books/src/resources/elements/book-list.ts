import { bindable } from 'aurelia-framework';

import { Book } from '../../models/book';

export class BookList {
  @bindable books: Book[];

  bookLocation(isFirst, isLast): string {
    if (isFirst) {
      return '- first book';
    }

    if (isLast) {
      return '- last book';
    }

    return '';
  }

  removeBook(index: number): void {
    this.books.splice(index, 1);
  }
}
