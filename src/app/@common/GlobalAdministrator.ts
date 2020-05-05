import { ElementRef, AfterViewInit } from '@angular/core';

const _DICTIONARY: any = {
    'en-EN': {
        'RCVSTA': 'RECEIVE STATUS',
        'RCVTYP': 'RECIEVE TYPE',
        'FDATE1': 'FROM DATE',
        'TODAT1': 'TO DATE',
        'FDATE2': 'FROM2 DATE',
        'TODAT2': 'TO2 DATE',
        'PTNRKY': 'PARTNER KEY',
        'PTNRNM': '',
        'SKUKEY': '',
        'SKUNAM': ''
    },
    'ko-KR': {
        'RCVSTA': '입고상태'
    }
}

export class GlobalAdministrator implements AfterViewInit {

    getLocale() {
        var locale = sessionStorage.getItem("locale");
        return locale != null ? locale : navigator.language;
    }

    setLocale(locale) {
        sessionStorage.setItem("locale", locale);
    }

    getLocaleValue(key) {
        const langBook = _DICTIONARY[this.getLocale()];
        return langBook[key];
    }
    globalize() {
        let elements = this.elRef.nativeElement.querySelectorAll('[global]');
        elements.forEach((v, i, a) => {
            const attrKey = v.getAttribute('global');
            v.textContent = this.getLocaleValue(attrKey);
        })
    }
    constructor(protected elRef?: ElementRef) {

    }
    ngAfterViewInit() {
        if (this.elRef != null && this.elRef != undefined) {
            this.globalize();
        }
    }
}