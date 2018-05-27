import { bindable } from 'aurelia-framework';

import { Book } from '../../models/book';

export class BookList {
  @bindable books: Book[];
}
