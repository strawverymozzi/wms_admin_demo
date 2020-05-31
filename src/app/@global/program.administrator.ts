import { Subject, } from 'rxjs';
const _PROGRAMMAPPER: object = {
    "/auth/login": {
        url: "/global/loginPage",
        dictionary: null,
        windowName: null,
        insFlg: null,
        updFlg: null,
        delFlg: null
    },
}
export function setNewProgram(view: string, data) {
    _PROGRAMMAPPER[view] = data
}
export function getProgramMap(): object {
    return _PROGRAMMAPPER;
}

export const mapperChange$ = new Subject<any>();
mapperChange$.asObservable();
