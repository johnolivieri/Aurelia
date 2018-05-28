import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import * as $ from 'jquery';

@inject(Element)
export class TooltipCustomAttribute {
  @bindable title: string;
  @bindable placement: string;

  constructor(private element: Element) {}

  attached() {
    $(this.element).tooltip({
      title: this.title,
      placement: this.placement
    });
  }

  detached() {
    $(this.element).tooltip('dispose');
  }
}
