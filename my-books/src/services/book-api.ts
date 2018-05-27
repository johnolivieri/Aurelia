import { inject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

import { Book } from '../models/book';

@inject(HttpClient)
export class BookApi {
  constructor(private http: HttpClient) {}

  getBooks(): Promise<Book[]> {
    return this.http.fetch('books.json')
        .then(response => response.json())
        .then(books => {
          return books;
        });
  }
}
