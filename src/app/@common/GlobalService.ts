import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from './common-http.service';
import { Observable } from 'rxjs';

const _DICTIONARYURL = '/dictionary/';
@Injectable()
export class GlobalService extends CommonHttpService {

    constructor(private http: HttpClient) {
        super(http);
    }

    public getDictionary(urlParam: string): Observable<any> {
        return this.getJson(_DICTIONARYURL + urlParam);
    }

}