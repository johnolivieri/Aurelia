export class HighlightValueConverter {
  toView(value: string): string {
    if (value && value.indexOf('<b>') !== -1) {
      return `<span style='background-color: #eceeef; padding: 10px'>${value}</span>`;  
    }

    return value;
  }
}
