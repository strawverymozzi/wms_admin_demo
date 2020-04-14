import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../../../@common/common-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const _MALLIDURL: string = '/selectBox/MALLID';
const _DETAILFORMDTO = {
  'RCVNUM': '',
  'RCODNM': '',
  'ERPNUM': '',
  'PCODNM': '',
  'BOLNUM': '',
  'INVNUM': '',
  'MALLID': '',
  'USNAME': '',
  'OORDID': ''
}
@Injectable()
export class MasterSearchSubFormService extends CommonHttpService {
  constructor(private http: HttpClient) {
    super(http);
  }
  public getDataObj(): any {
    return _DETAILFORMDTO;
  }
  public getMallIdCombo(): Observable<any> {
    return super.getJson(_MALLIDURL);
  }
}



