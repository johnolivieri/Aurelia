import { inject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

import { BookModel } from '../models/book-model';

@inject(HttpClient)
export class BookApi {
  constructor(private http: HttpClient) {}

  getBooks(): Promise<BookModel[]> {
    return this.http.fetch('books.json')
        .then(response => response.json())
        .then(books => {
          return books;
        });
  }

  saveBook(book: BookModel): Promise<BookModel> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(book);
      }, 1000);
    });
  }
}
