import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { map, catchError, retry } from 'rxjs/operators';
import { ProgramHelper } from '../@program/program-helper';


export const globalDictionary: any[] = [];

export let localDictionary: any;

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
        return this.http.get(url, { observe: 'response' }).pipe(
            retry(3),
            map((res) => {
                localDictionary = res.body["dictionary"];
                if (res.headers.get('authorization')) {
                    localStorage.setItem("access", res.headers.get('authorization'));
                    localStorage.setItem("refresh", res.headers.get('refreshtoken'));
                }

                return true;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    //throw new Error('not Found');
                }
                new Error("Translator API CALL resolve ERR: " + error.status)
                return of([]);
            }));
    }
    //     return this.getJson(url).pipe(
    //         retry(3),
    //         map((res) => {
    //             localDictionary = res.dictionary;
    //             return true;
    //         }),
    //         catchError((error: HttpErrorResponse) => {
    //             if (error.status === 404) {
    //                 //throw new Error('not Found');
    //             }
    //             new Error("Translator API CALL resolve ERR: " + error.status)
    //             return of([]);
    //         }));
    // }
}

