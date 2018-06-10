import { bindable, inject, computedFrom, observable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import * as _ from 'lodash';

import { BookApi } from '../../services/book-api';
import { BookModel } from '../../models/book-model';

@inject(BookApi, EventAggregator)
export class Books {
  books: BookModel[];
  private bookRemovedSubscription: Subscription;
  private bookSavedSubscription: Subscription;

  constructor(private bookApi: BookApi, private eventAggregator: EventAggregator) {
    this.books = [];
  }

  attached() {
    this.subscribeToEvents();
  }

  bind() {
    this.bookApi.getBooks().then(savedBooks => this.books = savedBooks);
  }

  detached() {
    this.bookRemovedSubscription.dispose();
    this.bookSavedSubscription.dispose();
  }

  // addBook(): void {
  //   this.books.push({title: this.bookTitle});
  //   this.bookTitle = '';

  //   // console.log('Book List:');
  //   // this.books.forEach(book => {
  //   //   console.log(`${book.title}`);
  //   // });
  // }

  removeBook(toRemove: BookModel): void {
    let bookIndex = _.findIndex(this.books, book => {
      return book.id === toRemove.id
    });
    
    this.books.splice(bookIndex, 1);
  }

  subscribeToEvents(): void {
    this.bookRemovedSubscription = this.eventAggregator.subscribe('book-removed', bookIndex => this.removeBook(bookIndex));
    this.bookSavedSubscription = this.eventAggregator.subscribe('save-book', book => this.bookSaved(book));
  }

  bookSaved(updatedBook: BookModel)  {
    this.bookApi
        .saveBook(updatedBook)
        .then((savedBook) => {
          this.eventAggregator.publish(`book-save-complete-${savedBook.id}`);
        })
  }

  bookTitleChanged(newValue, oldValue) {
    console.log(`Book title changed, Old Value: ${oldValue}, New Value: ${newValue}`)
  }

  // @computedFrom('bookTitle.length')
  // get canAdd() {
  //   return this.bookTitle.length === 0;
  // }
}
