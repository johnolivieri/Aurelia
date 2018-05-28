import { bindable, inject, computedFrom, observable } from 'aurelia-framework';

import { Book } from '../../models/book';
import { BookApi } from '../../services/book-api';

@inject(BookApi)
export class Books {
  books: Book[];
  @observable bookTitle: string;

  constructor(private bookApi: BookApi) {
    this.books = [];
    this.bookTitle = '';
  }

  bind() {
    this.bookApi.getBooks().then(savedBooks => this.books = savedBooks);
  }

  addBook(): void {
    this.books.push({title: this.bookTitle});
    this.bookTitle = '';

    console.log('Book List:');
    this.books.forEach(book => {
      console.log(`${book.title}`);
    });
  }

  bookTitleChanged(newValue, oldValue) {
    console.log(`Book title changed, Old Value: ${oldValue}, New Value: ${newValue}`)
  }

  @computedFrom('bookTitle.length')
  get canAdd() {
    return this.bookTitle.length === 0;
  }
}
