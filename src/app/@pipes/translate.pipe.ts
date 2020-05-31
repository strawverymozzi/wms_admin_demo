import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from '../@global/dictionary';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  private called: boolean = false;
  private translated: string;
 
  transform(text: string, key: string): any {
    if (!this.called) {
      this.called = true;
      Dictionary.dictionaryUpdate.subscribe(res => {
        return this.translated = Dictionary.getWord(key);
      })
    }
    return this.translated ? this.translated : text;
  }
}
