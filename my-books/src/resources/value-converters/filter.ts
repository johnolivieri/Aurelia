import { Book } from './../../models/book';

export class FilterValueConverter {
  toView(array: Book[], searchTerm: string): Book[] {
    return array.filter((item) => {
      return searchTerm && searchTerm.length > 0 ? this.itemMatches(searchTerm, item) : true;
    });
  }

  itemMatches(searchTerm: string, value: Book): boolean {
    let itemValue = value.title;

    if (!itemValue) {
      return false;
    }

    return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
  }
}
