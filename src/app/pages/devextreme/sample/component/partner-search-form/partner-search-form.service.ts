import { Injectable } from '@angular/core';

const _PTNSEARCHDTO = {
  'RCVNUM': '',
  'RCVSTA': '',
  'PCODNM': '',
  'OORDID': '',
  'RCODNM': '',
  'BOLNUM': '',
  'SALSRC': 'V',
  'PURSRC': '',
  'DELSRC': '',
  'VALUE1': '',
  'VALUE2': '',
  'VALUE3': '',
  'VALUE4': '',
}

@Injectable()
export class PartnerSearchFormService {

  constructor() { }

  public getDataObj() {
    return _PTNSEARCHDTO;
  }
}
