import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value): string {
    if (!value) {
      return '';
    }

    return moment(value).format('MM/DD/YYYY h:mm:ss a');
  }
}
