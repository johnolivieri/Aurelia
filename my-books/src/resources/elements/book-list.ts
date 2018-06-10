import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import { BookModel } from '../../models/book-model';

@inject(EventAggregator)
export class BookList {
  @bindable books: BookModel[];

  constructor(private eventAggregator: EventAggregator) { }

  removeBook(index: number): void {
    this.eventAggregator.publish('book-removed', index);
  }
}
