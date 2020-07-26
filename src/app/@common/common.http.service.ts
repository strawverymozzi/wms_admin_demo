import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class CommonHttpService {

  // http header객체
  private headers: HttpHeaders = new HttpHeaders();
  private options: any;
  private baseUrl = environment.apiUrl;

  constructor(protected _http: HttpClient) {
    // this.headers = this.headers.append('Accept', '*; charset=utf-8');
    // this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers = this.headers.append('Content-Type', 'application/json');
    // this.options = { headers: this.headers, responseType: 'json' };
    // this.options = { headers: this.headers, withCredentials: true, responseType: 'json' };
  }

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

  protected getJsonAjax(url: string) {
    url = this.baseUrl + url;
    return ajax(url).pipe(
      retry(3), // Retry up to 3 times before failing
      map(res => {
        if (!res.response) {
          throw new Error('Value expected!');
        } else if (res.response.err) {
          alert(`errCode : ${res.response.err}, errMsg: ${res.response.msg}`);
          throw new Error(res.response);
        }
        return res.response;
      }),
      catchError(err => err.code === '404' ? new Error('not Found') : err)
    );
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
