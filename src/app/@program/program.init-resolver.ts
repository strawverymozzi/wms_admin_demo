import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { COMMON_CONFIG } from '../@common/common.config';
import { settDictionary } from './program.dictionary';

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
    private data: any;
    constructor(private http: HttpClient) {
    }

    resolve(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = snapshot.data.callUponActive;
        return this.fetchProgramScopeData(url);
    }

    fetchProgramScopeData(url: string): Observable<any> {
        return this.http.get(url).pipe(
            retry(3),
            map((res) => {
                settDictionary(res[COMMON_CONFIG.DICTIONARY]);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    //throw new Error('not Found');
                }
                new Error("ProgramInitResolver ERROR : " + error.status)
                return of([]);
            }));
    }
}