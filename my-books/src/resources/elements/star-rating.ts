import { inject, bindable, DOM } from 'aurelia-framework';

import { StarModel } from './../../models/star-model';

@inject(Element)
export class StarRating {
  @bindable rating: number;
  stars: StarModel[];
  private hovered: boolean;

  constructor(private element: Element) {
    this.stars = [
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false }
    ];

    this.hovered = false;
  }

  bind()
  {
    this.applyRating(this.rating);
  }

  applyRating(rating: number): void {
    this.stars.forEach((star, index) => this.rateStar(star, rating, index));
  }

  private rateStar(star: StarModel, rating: number, index: number): void {
    if (index < rating) {
      this.toggleOn(star);
    } else {
      this.toggleOff(star);
    }
  }

  private toggleOn(star: StarModel): void {
    star.displayType = '';
    star.type = '';
    star.rated = true;
  }

  private toggleOff(star: StarModel): void {
    star.displayType = '-o';
    star.type = '-o';
    star.rated = false;
  }
  
  private ratingFromIndex(index: number, star: StarModel): number {
    return (index === 0 && star.rated) ? 0 : index + 1;
  }

  rate(index: number): void {
    let rating = this.ratingFromIndex(index, this.stars[0]);
    this.rating = rating;
    this.applyRating(rating);
    this.raiseChangedEvent();
  }

  mouseOut(hoverIndex: number) {
    if (!this.hovered) {
      return;
    }

    this.hovered = false;

    this.applyHoverState(hoverIndex);
  }

  private applyHoverState(hoverIndex: number): void {
    this.stars.forEach((star, index) => {
      if (!this.shouldApplyHover(index, hoverIndex, star)) {
        return;
      }

      if (this.hovered) {
        this.toggleDisplayOn(star);
      } else {
        this.toggleDisplayOff(star);
      }
    });
  }

  mouseOver(hoverIndex) {
    if (this.hovered) {
      return;
    }

    this.hovered = true;

    this.applyHoverState(hoverIndex);
  }

  private toggleDisplayOff(star: StarModel): void {
    star.displayType = star.type;
  }

  private toggleDisplayOn(star: StarModel): void {
    star.displayType = '';
  }

  private shouldApplyHover(starIndex: number, hoverIndex: number, star: StarModel): boolean {
    return starIndex <= hoverIndex && !star.rated;
  }

  private raiseChangedEvent(): void {
    let changeEvent = DOM.createCustomEvent('change', {
      detail: {
        rating: this.rating
      }
    });

    this.element.dispatchEvent(changeEvent);
  }
}
