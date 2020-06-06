import { Pipe, PipeTransform } from '@angular/core';
import { localDictionary } from '../@translate/translator';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {

  private book: any;
  constructor() {
    this.book = localDictionary;
  }

  transform(text: string, key: string): any {
    return (this.book && this.book[key]) ? this.book[key] : text;
  }
}
