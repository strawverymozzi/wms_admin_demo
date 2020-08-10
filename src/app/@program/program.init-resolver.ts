import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { COMMON_CONFIG } from '../@common/common.config';
import { settDictionary } from './program.dictionary';
import notify from 'devextreme/ui/notify';

/**
 * 프로그램 / 컴포넌트 로딩 전 호출되어 로직 수행 후 
 * 해당 컴포넌트에게 결과 값 전달.
 * 
 * 모듈별 Route 상수객체에 { returnedObj : ProgramInitManager } 형식으로 추가하여
 * 사용가능하며 returnedObj는 해당 컴포넌트에서 사용가능
 */
@Injectable({
    providedIn: 'root'
})
export class ProgramInitResolver implements Resolve<any>{
    constructor(private http: HttpClient) {
    }

    resolve(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = snapshot.data.callUponActive;
        return this.fetchProgramScopeData(url);
    }

    fetchProgramScopeData(url: string): Observable<any> {
        return this.http.get(url).pipe(
            retry(2),
            map((res) => {
                const dictionary = res[COMMON_CONFIG.DICTIONARY];
                settDictionary(dictionary);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                notify({ message: error.message, width: 500, position: 'top' }, 'error', 3000);
                new Error("ProgramInitResolver ERROR : " + error.status)
                return EMPTY;
            }));
    }
}