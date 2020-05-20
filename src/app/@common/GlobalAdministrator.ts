import { ElementRef, AfterViewInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from './common-http.service';


// let _DICTIONARY: any = {
//     'en-EN': {
//         'RCVSTA': 'RECEIVE STATUS',
//         'RCVTYP': 'RECIEVE TYPE',
//         'FDATE1': 'FROM DATE',
//         'TODAT1': 'TO DATE',
//         'FDATE2': 'FROM2 DATE',
//         'TODAT2': 'TO2 DATE',
//         'PTNRKY': 'PARTNER KEY',
//         'PTNRNM': '',
//         'SKUKEY': '',
//         'SKUNAM': '',
//         'EMAIL': 'Email Address',
//         'PASSWORD': 'Password',
//     },
//     'ko-KR': {
//         'RCVSTA': '입고상태',
//         'EMAIL': '이메일',
//         'PASSWORD': '비밀번호',
//     }
// }

const _DICTIONARYURL = 'http://localhost:3001/api/dictionary/';

export class GlobalAdministrator implements AfterViewInit {

    private compDictionary: any;

    getLocale() {
        var locale = localStorage.getItem("locale");
        return locale != null ? locale : navigator.language;
    }

    setLocale(locale) {
        localStorage.setItem("locale", locale);
    }

    getLocaleValue(key) {
        const langBook = this.compDictionary[this.getLocale()];
        return langBook[key];
    }
    globalize() {
        let elements = this.elRef.nativeElement.querySelectorAll('[global]');
        elements.forEach((v, i, a) => {
            const attrKey = v.getAttribute('global');
            if (this.getLocaleValue(attrKey)) {
                v.textContent = this.getLocaleValue(attrKey);
            }
        })
    }
    constructor(
        protected http: HttpClient,
        protected elRef?: ElementRef,
        protected dictionaryKey?: string,
    ) {
    }

    ngAfterViewInit() {
        if (this.elRef != null && this.elRef != undefined) {
            this.http.get(_DICTIONARYURL + this.dictionaryKey).subscribe(res => {
                this.compDictionary = res;
                this.globalize();
            })
            // this.http.get('http://www.jflab.co.kr:18000/api/v1/receive/rcvInfo').subscribe(res => {
            //     // { "success": true, "code": 0, 
            //     // "msg": "성공하였습니다.", "transationTime": "2020-05-10T19:47:53.6675322", 
            //     // "data": { "DICTION": { "SHPDAT": "SHIPPING DATE", "RCVSTA": "RECEIVE STATUS" } } }
            //     this.compDictionary = { "en-EN": res["data"]["DICTION"] };
            //     this.globalize();
            // })
        }
    }
}