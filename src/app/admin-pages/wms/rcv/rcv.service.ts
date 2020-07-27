import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonHttpService } from '../../../@common/common.http.service';
import { REGISTRY, environment } from '../../../../environments/environment';

@Injectable()
export class RcvService {

  constructor(
    private _http: HttpClient,

  ) {
  }

  //get
  public getListMasterGrid(queryStr?: string): Observable<any> {

    return this.getJson(REGISTRY.RCVMASTERGRID.GET + queryStr).pipe(
      map(data => {

        return (data["list"] && data["list"].length) ? data["list"] : null;
      })
    );
  }

  public getListDetailGrid(queryStr?: string): Observable<any> {
    return this.getJson(REGISTRY.RCVDETAILGRID.GET + queryStr).pipe(
      map(data => {
        return (data["list"] && data["list"].length) ? data["list"] : null;
      })
    );
  }

  //--입고 저장에서 UID값이 있을경우 Update됨.
  //insert+update
  public saveMaster(body?: any): Observable<any> {
    return this.postJson(REGISTRY.RCVMASTERGRID.POST, body).pipe(
      map(data => {
        return data;
      })
    );
  }

  public saveDetail(body?: any[]): Observable<any> {
    return this.postJson(REGISTRY.RCVDETAILGRID.POST, body).pipe(
      map(data => {
        return data;
      })
    );
  }

  public saveAll(body?: any) {
    return this.postJson(REGISTRY.RCVGRID.POST, body).pipe(
      map(data => {
        return data;
      })
    );
  }

  //delete Output : 0이 정상
  public deleteMaster(options: any): Observable<any> {
    return this.delete(REGISTRY.RCVMASTERGRID.DELETE, options).pipe(
      map(data => {
        return data;
      })
    );
  }

  public deleteDetail(options: any): Observable<any> {
    return this.delete(REGISTRY.RCVDETAILGRID.DELETE, options).pipe(
      map(data => {
        return data;
      })
    );
  }

  private headers: HttpHeaders = new HttpHeaders();
  private options: any;
  private baseUrl = 'http://www.jflab.co.kr';

  protected setInitHeaders(headers: Map<string, string>) {
    headers.forEach((element, key) => {
      this.headers.append(key, element);
    });
  }

  protected generateParamFromMap(paramMap: Map<string, any>): string {
    let paramStr = '';
    paramMap.forEach((element, key) => {
      paramStr += key + '=' + JSON.stringify(element) + '&';
    });
    return paramStr.substr(0, paramStr.length - 1);
  }

  protected generateParamFromObject(paramMap: Object): string {
    let paramStr = '?';
    Object.keys(paramMap).forEach((key) => {
      paramStr += key + '=' + paramMap[key] + '&';
    });
    return paramStr.substr(0, paramStr.length - 1);
  }

  protected getJson(url: string): Observable<any> {
    url = this.baseUrl + url;
    return this._http.get(url, this.options);
  }

 

  protected postJson(url: string, paramObj: Object): Observable<any> {
    url = this.baseUrl + url;
    return this._http.post(url, paramObj, this.options);
  }

  protected postText(url: string, paramObj: Object): Observable<any> {
    url = this.baseUrl + url;
    this.options.responseType = 'text';
    return this._http.post(url, paramObj, this.options);
  }

  protected delete(url: string, options: any): Observable<any> {
    url = this.baseUrl + url;
    return this._http.delete(url, options);
  }

}