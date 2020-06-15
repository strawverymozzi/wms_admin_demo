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

    // static getDictionaryURL(landingPath: string): string {
    //     return PROGRAMMAPPER[landingPath] ? PROGRAMMAPPER[landingPath].url : "/";
    // }

    // static tokenAppendProgramMeta(token: string, route): string {
    //     const decoded = jsonwebtoken.decode(token);
    //     const wn = PROGRAMMAPPER[route].windowName;
    //     const iFlg = PROGRAMMAPPER[route].insFlg;
    //     const uFlg = PROGRAMMAPPER[route].updFlg;
    //     const dFlg = PROGRAMMAPPER[route].delFlg;


    //     decoded["windowName"] = wn;
    //     decoded["pageRole"] =
    //     {
    //         infFlg: iFlg,
    //         updFlg: uFlg,
    //         delFlg: dFlg
    //     }
    //     return jsonwebtoken.sign(decoded, SECRET);
    // }

}
