import { Injectable } from '@angular/core';

const _SKUSEARCHDTO = {
  'RCVNUM': '',
  'RCVSTA': '',
  'PCODNM': '',
  'OORDID': '',
  'RCODNM': '',
  'BOLNUM': '',
  'SALSRC': 'V',
  'PURSRC': '',
  'DELSRC': '',
}

@Injectable()
export class SkukeySearchFormService {
  constructor() { }

  public getDataObj() {
    return _SKUSEARCHDTO;
  }
}
