import { ajax } from 'rxjs/ajax';
import { retry, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class GlobalAdministrator {

    private _dictionaryURL: string;
    private baseUrl = environment.apiUrl;

    constructor(dictionaryURL?: string) {
        this._dictionaryURL = dictionaryURL;
        this.init(this._dictionaryURL).subscribe(res => {
            if (res.hasOwnProperty("dictionary")) {
                this.coin(res["dictionary"]);
            }
        })
    }

    private coin(wordData: any) {
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
}
