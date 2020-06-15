import { Pipe, PipeTransform } from '@angular/core';
import { getDictionary } from '../@program/program.dictionary';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {

  private book: any;
  constructor() {
    this.book = getDictionary();
  }
  transform(text: string, key: string): any {
    return (this.book && this.book[key]) ? this.book[key] : text;
  }
}
