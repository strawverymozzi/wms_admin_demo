import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../../../../../@common/common-http.service';
import { Observable } from 'rxjs';

const _RCVSTATUSURL: string = '/selectBox/RCVSTATUS';
const _RCVTYPEURL: string = '/selectBox/RCVTYPE';
const _PTNNAMEURL: string = '/selectBox/PTNRNM';

const _MASTERFORMDTO = {
  'RCVSTA': '',
  'RCVTYP': '',
  'FDATE1': '',
  'TODAT1': '',
  'FDATE2': '',
  'TODAT2': '',
  'PTNRKY': '',
  'PTNRNM': '',
  'SKUKEY': '',
  'SKUNAM': ''
};

@Injectable()
export class MasterSearchFormService extends CommonHttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  public getDataObj(): any {
    return _MASTERFORMDTO;
  }
  public getRcvStatusCombo(): Observable<any> {
    return super.getJson(_RCVSTATUSURL);
  }
  public getRcvTypeCombo(): Observable<any> {
    return super.getJson(_RCVTYPEURL);
  }
  public getPtnNameByCode(data:any): Observable<any> {
    return super.getJson(_PTNNAMEURL);
  }
}



