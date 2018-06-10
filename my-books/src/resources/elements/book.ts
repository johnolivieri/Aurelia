import { bindable, inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { BookModel } from './../../models/book-model';

@inject(EventAggregator)
export class Book {
  @bindable book: BookModel;
  @bindable searchTerm: string;
  editMode: boolean;
  editModeChangedSubscription: Subscription;

  constructor(private eventAggregator: EventAggregator) {
    this.editMode = false;
  }

  bind() {
    this.subscribeToEvents();
  }

  unbind() {
    this.editModeChangedSubscription.dispose();
  }

  markRead(): void {
    this.book.readDate = new Date();
    this.book.read = true;
  }

  removeBook(): void {
    this.eventAggregator.publish('book-removed', this.book);
  }

  subscribeToEvents(): void {
    this.editModeChangedSubscription = this.eventAggregator.subscribe('edit-mode-changed', mode => {
      this.editMode = mode;
    });
  }

  toggleEditMode(event): void {
    this.editMode = !this.editMode;
  }
}
