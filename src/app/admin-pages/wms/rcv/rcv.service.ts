import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonHttpService } from '../../../@common/common.http.service';
import { REGISTRY } from '../../../../environments/environment';

@Injectable()
export class RcvService extends CommonHttpService {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
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


}