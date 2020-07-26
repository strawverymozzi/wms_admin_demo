import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { setInitValue, HELPERCONFIG } from './helper-config';
import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../../@common/common.http.service';

@Injectable({ providedIn: 'root' })
export class SearchHelperService extends CommonHttpService {

  static _control = new Subject<any>();
  static _templateWatcher = new Subject<any>();

  constructor(protected http: HttpClient) {
    super(http);
  }

  static openHelper(helperKey: string, param?: any): Observable<any> {
    if (param) {
      setInitValue(helperKey, param);
    }
    this._control.next(HELPERCONFIG[helperKey]);
    return this._templateWatcher;
  }

  public getList(url: string, queryStr?: string): Observable<any> {
    return this.getJson(url + (queryStr || '')).pipe(
      map(data => {
        return data || [];
      })
    );
  }

  public getMapWithoutView(helperKey: string, queryStr?: string): Observable<any> {
    return this.getJson(HELPERCONFIG[helperKey].url + (queryStr + '')).pipe(
      map(data => {
        return data || null;
      })
    );
  }

}