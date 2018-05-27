import { bindable, inject } from 'aurelia-framework';

import { Book } from '../../models/book';
import { BookApi } from '../../services/book-api';

@inject(BookApi)
export class Books {
  books: Book[];
  bookTitle: string;

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
}