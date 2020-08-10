import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { COMMON_CONFIG } from '../@common/common.config';
import { getInitUri } from './program.registry';
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
export class AdminProgramInitResolver implements Resolve<any>{
    constructor(private http: HttpClient) { }

    resolve(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = getInitUri(state.url);
        return this.fetchProgramScopeData(url);
    }

    fetchProgramScopeData(url: string): Observable<any> {
        return this.http.get(url, {
            observe: 'response',
        }).pipe(
            retry(2),
            map((res) => {
                try {
                    const dictionary = res.body["data"][COMMON_CONFIG.DICTIONARY];
                    settDictionary(dictionary);
                } catch (error) {
                    console.warn("Dictionary Setting FAILED");
                }
                if (res.headers.get(COMMON_CONFIG.ACCESS_TOKEN_HEADER)) {
                    localStorage.setItem(
                        COMMON_CONFIG.ACCESS_TOKEN,
                        res.headers.get(COMMON_CONFIG.ACCESS_TOKEN_HEADER));
                    console.warn("ACCESS TOKEN UPDATED")
                }
                if (res.headers.get(COMMON_CONFIG.REFRESH_TOKEN_HEADER)) {
                    localStorage.setItem(
                        COMMON_CONFIG.REFRESH_TOKEN,
                        res.headers.get(COMMON_CONFIG.REFRESH_TOKEN_HEADER));
                    console.warn("REFRESH TOKEN UPDATED")
                }
                return res.body;
            }),
            catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
                notify({ message: error.message, width: 500, position: 'top' }, 'error', 3000);
                new Error("AdminProgramInitResolver ERROR : " + error.status)
                return EMPTY;
            }));
    }

}