import { bindable } from 'aurelia-framework';

import { Book } from './book';

export class BookList {
  @bindable books: Book[];
}
