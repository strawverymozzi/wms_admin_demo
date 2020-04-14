import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../../../@common/common-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const _MASTERGRIDURL: string = '/grid/HEADGRID';
const _MASTERGRIDCOLCONFIG = [
  { caption: 'mastername1', dataField: "CODEA", width: 300, fixed: true, visible: true },
  { caption: 'mastername2', dataField: "CODEB", width: 300, fixed: true, visible: true },
  { caption: 'mastername3', dataField: "CODEC", width: 300, fixed: true, visible: true },
  { caption: 'mastername4', dataField: "CODED", width: 300, fixed: true, visible: true },
  { caption: 'mastername5', dataField: "CODEE", width: 300, fixed: true, visible: true },
  { caption: 'mastername6', dataField: "CODEF", width: 300, fixed: true, visible: true },
  { caption: 'mastername7', dataField: "CODEG", width: 300, fixed: true, visible: true },
  { caption: 'mastername8', dataField: "CODEH", width: 300, fixed: true, visible: true },
  { caption: 'mastername9', dataField: "CODEI", width: 300, fixed: true, visible: true },
]
const _DETAILGRIDURL: string = '/grid/ITEMGRID';
const _DETAILGRIDCOLCONFIG = [
  { caption: 'detailname1', dataField: "CODEA", width: 300, fixed: true, visible: true },
  { caption: 'detailname2', cellTemplate: "cellSearchHelpPTNKEY", dataField: "CODEB", width: 300, fixed: true, visible: true },
  { caption: 'detailname3', dataField: "CODEC", width: 300, fixed: true, visible: true },
  { caption: 'detailname4', dataField: "CODED", width: 300, fixed: true, visible: true },
  { caption: 'detailname5', dataField: "CODEE", width: 300, fixed: true, visible: true },
  { caption: 'detailname6', dataField: "CODEF", width: 300, fixed: true, visible: true },
  { caption: 'detailname7', dataField: "CODEG", width: 300, fixed: true, visible: true },
  { caption: 'detailname8', dataField: "CODEH", width: 300, fixed: true, visible: true },
  { caption: 'detailname9', dataField: "CODEI", width: 300, fixed: true, visible: true },
]
const _PTNSEARCHGRIDURL: string = '/grid/POPGRID';
const _PTNSEARCHGRIDCOLCONFIG = [
  { caption: 'ptnname1', dataField: "CODEA", width: 300, fixed: true, visible: true },
  { caption: 'ptnname2', dataField: "CODEB", width: 300, fixed: true, visible: true },
  { caption: 'ptnname3', dataField: "CODEC", width: 300, fixed: true, visible: true },
  { caption: 'ptnname4', dataField: "CODED", width: 300, fixed: true, visible: true },
  { caption: 'ptnname5', dataField: "CODEE", width: 300, fixed: true, visible: true },
  { caption: 'ptnname6', dataField: "CODEF", width: 300, fixed: true, visible: true },
  { caption: 'ptnname7', dataField: "CODEG", width: 300, fixed: true, visible: true },
  { caption: 'ptnname8', dataField: "CODEH", width: 300, fixed: true, visible: true },
  { caption: 'ptnname9', dataField: "CODEI", width: 300, fixed: true, visible: true },
]
const _SKUSEARCHGRIDURL: string = '/grid/POPGRID';
const _SKUSEARCHGRIDCOLCONFIG = [
  { caption: 'skuname1', dataField: "CODEA", width: 300, fixed: true, visible: true },
  { caption: 'skuname2', dataField: "CODEB", width: 300, fixed: true, visible: true },
  { caption: 'skuname3', dataField: "CODEC", width: 300, fixed: true, visible: true },
  { caption: 'skuname4', dataField: "CODED", width: 300, fixed: true, visible: true },
  { caption: 'skuname5', dataField: "CODEE", width: 300, fixed: true, visible: true },
  { caption: 'skuname6', dataField: "CODEF", width: 300, fixed: true, visible: true },
  { caption: 'skuname7', dataField: "CODEG", width: 300, fixed: true, visible: true },
  { caption: 'skuname8', dataField: "CODEH", width: 300, fixed: true, visible: true },
  { caption: 'skuname9', dataField: "CODEI", width: 300, fixed: true, visible: true }
]
@Injectable()
export class GridService extends CommonHttpService {
  constructor(private http: HttpClient) {
    super(http);
  }
  public getMasterGridColumnConfig(): any {
    return _MASTERGRIDCOLCONFIG;
  }
  public getMasterGridData(data: any): Observable<any> {
    return super.getJson(_MASTERGRIDURL);
  }
  public getDetailGridColumnConfig(): any {
    return _DETAILGRIDCOLCONFIG;
  }
  public getDetailGridData(data: any): Observable<any> {
    return super.getJson(_DETAILGRIDURL);
  }
  public getPtnGridColumnConfig(): any {
    return _PTNSEARCHGRIDCOLCONFIG;
  }
  public getPtnUpGridData(): Observable<any> {
    return super.getJson(_PTNSEARCHGRIDURL);
  }
  public getSkuGridColumnConfig(): any {
    return _SKUSEARCHGRIDCOLCONFIG;
  }
  public getSkuUpGridData(): Observable<any> {
    return super.getJson(_SKUSEARCHGRIDURL);
  }
}



