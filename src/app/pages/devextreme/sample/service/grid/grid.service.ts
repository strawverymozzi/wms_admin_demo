import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../../../@common/common-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// const _MASTERGRIDURL: string = "http://www.jflab.co.kr:18000/api/v1/receive/rcv?criteria=tenant=='1000';rcvKey=='99999';fdds=bt=(2020-04-21,2020-08-01)";
// const _MASTERGRIDURL: string = "/grid/HEADGRID";
const _MASTERGRIDURL: string ='http://www.jflab.co.kr:18000/api/v1/receive/rcvInfo'

const _MASTERGRIDSAVEURL: string = '/grid/SAVEHEADGRID';

const _MASTERGRIDCOLCONFIG = [
  { caption: 'url', dataField: "url", width: 300, fixed: true, visible: true },
  { caption: 'uid', dataField: "uid", width: 300, fixed: true, visible: true },
  { caption: 'name', dataField: "name", width: 300, fixed: true, visible: true },
  { caption: 'tenant', dataField: "tenant", width: 300, fixed: true, visible: true },
  { caption: 'ownoranotherflg', dataField: "ownoranotherflg", width: 300, fixed: true, visible: true },
  { caption: 'transportpriority', dataField: "transportpriority", width: 300, fixed: true, visible: true },
  { caption: 'ownercustomercd', dataField: "ownercustomercd", width: 300, fixed: true, visible: true },
  { caption: 'ownersuppliercd', dataField: "ownersuppliercd", width: 300, fixed: true, visible: true },
  { caption: 'itemadmin', dataField: "itemadmin", width: 300, fixed: true, visible: true },
  { caption: 'actflg', dataField: "actflg", width: 300, fixed: true, visible: true },
  { caption: 'companycd', dataField: "companycd", width: 300, fixed: true, visible: true },
  { caption: 'countrycd', dataField: "countrycd", width: 300, fixed: true, visible: true },
  { caption: 'postno', dataField: "postno", width: 300, fixed: true, visible: true },
  { caption: 'districtcd', dataField: "districtcd", width: 300, fixed: true, visible: true },
  { caption: 'portcd', dataField: "portcd", width: 300, fixed: true, visible: true },
  { caption: 'refname', dataField: "refname", width: 300, fixed: true, visible: true },
  { caption: 'address1', dataField: "address1", width: 300, fixed: true, visible: true },
  { caption: 'address2', dataField: "address2", width: 300, fixed: true, visible: true },
  { caption: 'address3', dataField: "address3", width: 300, fixed: true, visible: true },
  { caption: 'f_USER3', dataField: "f_USER3", width: 300, fixed: true, visible: true },
  { caption: 'f_USER5', dataField: "f_USER5", width: 300, fixed: true, visible: true },
  { caption: 'companygroup', dataField: "companygroup", width: 300, fixed: true, visible: true },
  { caption: 'typecustomer', dataField: "typecustomer", width: 300, fixed: true, visible: true },
  { caption: 'f_USER4', dataField: "f_USER4", width: 300, fixed: true, visible: true },
  { caption: 'phone1', dataField: "phone1", width: 300, fixed: true, visible: true },
  { caption: 'phone2', dataField: "phone2", width: 300, fixed: true, visible: true },
  { caption: 'typesupplier', dataField: "typesupplier", width: 300, fixed: true, visible: true },
  { caption: 'typeshipto', dataField: "typeshipto", width: 300, fixed: true, visible: true },
  { caption: 'typecarrier', dataField: "typecarrier", width: 300, fixed: true, visible: true },
  { caption: 'typeetc', dataField: "typeetc", width: 300, fixed: true, visible: true },
  { caption: 'typewarehouse', dataField: "typewarehouse", width: 300, fixed: true, visible: true },
  { caption: 'f_USER1', dataField: "f_USER1", width: 300, fixed: true, visible: true },
  { caption: 'typeowner', dataField: "typeowner", width: 300, fixed: true, visible: true },
  { caption: 'f_USER2', dataField: "f_USER2", width: 300, fixed: true, visible: true },
  { caption: 'f_USER10', dataField: "f_USER10", width: 300, fixed: true, visible: true },
  { caption: 'purchasetype', dataField: "purchasetype", width: 300, fixed: true, visible: true },
  { caption: 'ownerrefflg', dataField: "ownerrefflg", width: 300, fixed: true, visible: true },
  { caption: 'f_USER8', dataField: "f_USER8", width: 300, fixed: true, visible: true },
  { caption: 'f_USER6', dataField: "f_USER6", width: 300, fixed: true, visible: true },
  { caption: 'f_USER9', dataField: "f_USER9", width: 300, fixed: true, visible: true },
  { caption: 'f_USER7', dataField: "f_USER7", width: 300, fixed: true, visible: true },
  { caption: 'calendarcd', dataField: "calendarcd", width: 300, fixed: true, visible: true },
  { caption: 'bsnumber', dataField: "bsnumber", width: 300, fixed: true, visible: true },
  { caption: 'fax1', dataField: "fax1", width: 300, fixed: true, visible: true },
  { caption: 'email', dataField: "email", width: 300, fixed: true, visible: true },
  { caption: 'aname', dataField: "aname", width: 300, fixed: true, visible: true },
  { caption: 'sname', dataField: "sname", width: 300, fixed: true, visible: true },
  { caption: 'fax2', dataField: "fax2", width: 300, fixed: true, visible: true },
  { caption: 'CREATEDBY', dataField: "CREATEDBY", width: 300, fixed: true, visible: true },
  { caption: 'CREATEDDATE', dataField: "CREATEDDATE", width: 300, fixed: true, visible: true },
  { caption: 'CREATEIP', dataField: "CREATEIP", width: 300, fixed: true, visible: true },
  { caption: 'LASTMODIFIEDBY', dataField: "LASTMODIFIEDBY", width: 300, fixed: true, visible: true },
  { caption: 'LASTMODIFIEDDATE', dataField: "LASTMODIFIEDDATE", width: 300, fixed: true, visible: true },
  { caption: 'LASTMODIFIEDIP', dataField: "LASTMODIFIEDIP", width: 300, fixed: true, visible: true },
  { caption: 'UTC', dataField: "UTC", width: 300, fixed: true, visible: true },
  { caption: 'REMARKS', dataField: "REMARKS", width: 300, fixed: true, visible: true },
  { caption: 'ROW_VERSION', dataField: "ROW_VERSION", width: 300, fixed: true, visible: true },
  { caption: 'TENANT', dataField: "TENANT", width: 300, fixed: true, visible: true },

]
const _DETAILGRIDURL: string = '/grid/ITEMGRID';
const _DETAILGRIDCOLCONFIG = [
  { caption: 'detailname1', dataField: "CODEA", width: 300, fixed: true, visible: true },
  { caption: 'detailname2', dataField: "CODEB", width: 300, fixed: true, visible: true },
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
const _DETAILGRIDDROPSEARCH: string = '/grid/PTNSEARCHDROPGRID';
const _DETAILDROPGRIDCONFIG = [
  { caption: 'PTNRKY', dataField: "PTNRKY", width: 50, fixed: true, visible: true },
  { caption: 'PTNRNM', dataField: "PTNRNM", width: 50, fixed: true, visible: true },
  { caption: 'tenant', dataField: "tenant", width: 50, fixed: true, visible: true },
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

    // return this.http.get(_MASTERGRIDURL).pipe(map(res => {
    //   const rsList = [];
    //   if (res && res["success"] && res["list"].length) {
    //     return res["list"];
    //   }
    //   return rsList;
    // }))
    return super.getJson(_MASTERGRIDURL).pipe(map(res => {
      const rsList = [];
      if (res && res.success && res.list.length) {
        return res.list;
      }
      return rsList;
    }))
  }

  public saveAPITEST(data: any[]): Observable<any> {
    return super.postJson(_MASTERGRIDSAVEURL, data);
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
  public getDetailDropGridColumnConfig(): any {
    return _DETAILDROPGRIDCONFIG;
  }
  public getDetailDropGridData(): Observable<any> {
    return super.getJson(_DETAILGRIDDROPSEARCH).pipe(map(res => {
      const rsList = [];
      if (res && res.success && res.list.length) {
        return res.list;
      }
      return rsList;
    }))
  }
}



