import { BookModel } from './../../models/book-model';

export class FilterValueConverter {
  toView(array: BookModel[], searchTerm: string): BookModel[] {
    return array.filter((item) => {
      return searchTerm && searchTerm.length > 0 ? this.itemMatches(searchTerm, item) : true;
    });
  }

  itemMatches(searchTerm: string, value: BookModel): boolean {
    let itemValue = value.title;

    if (!itemValue) {
      return false;
    }

    return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
  }
}
