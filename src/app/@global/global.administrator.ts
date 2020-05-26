import { ElementRef, AfterViewInit, } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { retry, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class GlobalAdministrator implements AfterViewInit {

    private _childElement: ElementRef;
    private _dictionaryURL: string;
    private baseUrl = environment.apiUrl;


    constructor(childElement?: ElementRef, dictionaryURL?: string) {
        this._childElement = childElement;
        this._dictionaryURL = dictionaryURL;
    }

    ngAfterViewInit() {
        if (this._childElement && this._dictionaryURL) {
            this.init(this._dictionaryURL).subscribe(res => {
                if (res.hasOwnProperty("dictionary")) {
                    this.globalize(res["dictionary"]);
                }
            })
        }
    }

    private init(url: string) {
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

    private globalize(dictionary: any) {
        let elements = this._childElement.nativeElement.querySelectorAll('[global]');
        elements.forEach((v, i, a) => {
            const attrKey = v.getAttribute('global');
            v.textContent = dictionary[attrKey];
        })
    }
}
