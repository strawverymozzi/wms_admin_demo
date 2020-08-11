/**
 * Route 별 프로그램 init URL 매핑 상수 설정 파일
 *  */

import { COMMON_CONFIG } from '../@common/common.config';

const ADMININITURI = {};
let adminLeft = [];

export function getAdminLeft(): any[] {
    return adminLeft;
}

export function setAdminLeft(menuArr: any[]) {
    adminLeft = menuArr;
}

export function registerInitUri(view: string, data: any) {
    ADMININITURI[view] = data.url // route : init uri
}

export function getInitUri(route: string) {
    return ADMININITURI[route];
}

export function getProgramMap(): object {
    return ADMININITURI;
}

export function isRegistered(viewName: string, reqUrl): boolean {
    if (!ADMININITURI.hasOwnProperty(viewName)) {
        throw new Error("Unregistered view : " + viewName + ".\nFailed to attach view role to token payload : " + reqUrl)
    }
    return ADMININITURI.hasOwnProperty(viewName);
}

export function parseProgramList(returnedList: any[], insertedList: any[]): void {
    for (let menuObj of insertedList) {
        if (menuObj[COMMON_CONFIG.LINK]) {
            registerInitUri(menuObj[COMMON_CONFIG.LINK],
                {
                    url: menuObj[COMMON_CONFIG.URL],
                    windowName: menuObj[COMMON_CONFIG.WINDOWNAME],
                    insFlg: menuObj[COMMON_CONFIG.INSFLG],
                    updFlg: menuObj[COMMON_CONFIG.UPDFLG],
                    delFlg: menuObj[COMMON_CONFIG.DELFLG]
                })
        }

        const setting = {
            title: menuObj[COMMON_CONFIG.TITLE],
            icon: menuObj[COMMON_CONFIG.ICON],
            link: menuObj[COMMON_CONFIG.LINK],
        }

        if (Array.isArray(menuObj[COMMON_CONFIG.CHILDREN]) && menuObj[COMMON_CONFIG.CHILDREN].length) {
            if (menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.LINK]) {
                registerInitUri(menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.LINK],
                    {
                        url: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.URL],
                        windowName: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.WINDOWNAME],
                        insFlg: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.INSFLG],
                        updFlg: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.UPDFLG],
                        delFlg: menuObj[COMMON_CONFIG.CHILDREN][COMMON_CONFIG.DELFLG]
                    })
            }
            setting[COMMON_CONFIG.CHILDREN] = [];
            parseProgramList(setting[COMMON_CONFIG.CHILDREN], menuObj[COMMON_CONFIG.CHILDREN]);
        }
        returnedList.push(setting);
    }
}
