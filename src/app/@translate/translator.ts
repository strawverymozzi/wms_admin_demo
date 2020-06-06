import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { map, catchError, retry } from 'rxjs/operators';
import { ProgramHelper } from '../@program/program-helper';


export const globalDictionary: any = {

}

export let localDictionary: any = {

};

@Injectable({
    providedIn: 'root'
})
export class Translator extends CommonHttpService implements Resolve<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = ProgramHelper.getDictionaryURL(state.url);
        return this.fetchPageDictionary(url);
    }

    fetchPageDictionary(url: string): Observable<any> {
        return this.getJson(url).pipe(
            retry(3),
            map((res) => {
                localDictionary = res.dictionary;
                return true;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                     //throw new Error('not Found');
                }
                console.log("Translator API CALL resolve ERR: " + error.status)
                return of([]);
            }));
    }
}

// private init(url: string) {
//     url = this.baseUrl + url;
//     return ajax(url).pipe(
//         retry(3), // Retry up to 3 times before failing
//         map(res => {
//             if (!res.response) {
//                 throw new Error('Value expected!');
//             } else if (res.response.err) {
//                 alert(`errCode : ${res.response.err}, errMsg: ${res.response.msg}`);
//                 throw new Error(res.response);
//             }
//             return res.response;
//         }),
//         catchError(err => err.code === '404' ? new Error('not Found') : err)
//     );
// }
