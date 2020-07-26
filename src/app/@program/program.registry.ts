/**
 * Route 별 프로그램 init URL 매핑 상수 설정 파일
 *  */

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
    if (ADMININITURI[route] == 'http://www.jflab.co.kr:18001/api/v1/rec/receive') {
        ADMININITURI[route] = 'http://localhost:8001/api/v1/rec/receive';
    }
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
        if (menuObj["link"]) {
            registerInitUri(menuObj["link"],
                {
                    url: menuObj["url"],
                    windowName: menuObj["windowName"],
                    insFlg: menuObj["insFlg"],
                    updFlg: menuObj["updFlg"],
                    delFlg: menuObj["delFlg"]
                })
        }

        const setting = {
            title: menuObj["title"],
            icon: menuObj["icon"],
            link: menuObj["link"],
        }

        if (Array.isArray(menuObj["children"]) && menuObj["children"].length) {
            if (menuObj["children"]["link"]) {
                registerInitUri(menuObj["children"]["link"],
                    {
                        url: menuObj["children"]["url"],
                        windowName: menuObj["children"]["windowName"],
                        insFlg: menuObj["children"]["insFlg"],
                        updFlg: menuObj["children"]["updFlg"],
                        delFlg: menuObj["children"]["delFlg"]
                    })
            }
            setting["children"] = [];
            parseProgramList(setting["children"], menuObj["children"]);
        }
        returnedList.push(setting);
    }
}
