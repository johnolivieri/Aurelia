import { bindable, inject, computedFrom, DOM } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import * as _ from 'lodash';

import { BookModel } from './../../models/book-model';
import { StarRating } from './star-rating';

@inject(EventAggregator)
export class EditBook {
  @bindable editMode: boolean;
  @bindable book: BookModel;

  private bookSaveCompleteSubscription: Subscription;
  private loading: boolean = false;
  private saved: boolean = false;
  temporaryBook: BookModel;

  private ratingChangedListener;
  private ratingElement: Element;
  private starRatingViewModel: StarRating;

  constructor(private eventAggregator: EventAggregator) {
    this.resetTempBook();
    this.ratingChangedListener = e => this.temporaryBook.rating = e.rating;
  }

  attached() {
    this.bookSaveCompleteSubscription = this.eventAggregator.subscribe(`book-save-complete-${this.book.id}`, () => this.bookSaveComplete());
  }

  bind() {
    this.resetTempBook();
    this.ratingElement.addEventListener('change', this.ratingChangedListener);
  }

  detached() {
    this.bookSaveCompleteSubscription.dispose();
    this.ratingElement.removeEventListener('change', this.ratingChangedListener);
  }

  editModeChanged(editModeNew, editModeOld) {
    if (editModeNew) {
      this.resetTempBook();
    }
  }

  @computedFrom('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating')
  get canSave() {
    return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
  }

  private resetTempBook(): void {
    if (this.book) {
      this.temporaryBook = Object.assign({}, this.book);
    }
  }

  cancel(): void {
    this.temporaryBook = this.book;
    this.starRatingViewModel.applyRating(this.temporaryBook.rating);
    this.toggleEditMode();
  }

  save(): void {
    this.loading = true;
    this.publishBookSavedEvent();
  }

  bookSaveComplete() {
    this.loading = false;
    this.saved = true;
    setTimeout(() => {
      this.resetTempBook();
      this.saved = false;
      this.toggleEditMode();
    }, 500);
  }

  publishBookSavedEvent() {
    this.eventAggregator.publish('save-book', this.temporaryBook);
  }

  private toggleEditMode(): void {
    this.eventAggregator.publish('edit-mode-changed', !this.editMode);
  }
}
