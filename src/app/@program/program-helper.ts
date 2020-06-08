import * as jsonwebtoken from 'jsonwebtoken';
import { Injectable } from '@angular/core';

const PROGRAMMAPPER: any = {
    "/auth/login": {
        // url: "/global/loginPage",
        url: "http://www.jflab.co.kr:18000/auth/login?language=ko-KR",
        windowName: null,
        insFlg: null,
        updFlg: null,
        delFlg: null
    }
}
const SECRET = 'cyy4KhQAOWuj94LtM6Yvt$FGOQb8KBN6lIXmFFG7!Yv6K#ewWCnH#Q5IS2MhxKp&';


export const NBMenuList = [];


export function setNewProgram(view: string, data) {
    PROGRAMMAPPER[view] = data
}

export function getProgramMap(): object {
    return PROGRAMMAPPER;
}

export function isRegistered(viewName: string, reqUrl): boolean {
    if (!PROGRAMMAPPER.hasOwnProperty(viewName)) {
        throw new Error("Unregistered view : " + viewName + ".\nFailed to attach view role to token payload : " + reqUrl)
    }
    return PROGRAMMAPPER.hasOwnProperty(viewName);
}

@Injectable({
    providedIn: 'root'
})
export class ProgramHelper {
    constructor() {
    }

    static getDictionaryURL(landingPath: string): string {
        return PROGRAMMAPPER[landingPath] ? PROGRAMMAPPER[landingPath].url : "/";
    }

    static tokenAppendProgramMeta(token: string, route): string {
        const decoded = jsonwebtoken.decode(token);
        const wn = PROGRAMMAPPER[route].windowName;
        const iFlg = PROGRAMMAPPER[route].insFlg;
        const uFlg = PROGRAMMAPPER[route].updFlg;
        const dFlg = PROGRAMMAPPER[route].delFlg;


        decoded["windowName"] = wn;
        decoded["pageRole"] =
        {
            infFlg: iFlg,
            updFlg: uFlg,
            delFlg: dFlg
        }
        return jsonwebtoken.sign(decoded, SECRET);
    }

    static parseProgramList(returnedList: any[], insertedList: any[]) {
        for (let menuObj of insertedList) {
            if (menuObj["link"]) {
                setNewProgram(menuObj["link"],
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
                    setNewProgram(menuObj["children"]["link"],
                        {
                            url: menuObj["children"]["url"],
                            windowName: menuObj["children"]["windowName"],
                            insFlg: menuObj["children"]["insFlg"],
                            updFlg: menuObj["children"]["updFlg"],
                            delFlg: menuObj["children"]["delFlg"]
                        })
                }
                setting["children"] = [];
                this.parseProgramList(setting["children"], menuObj["children"]);
            }
            returnedList.push(setting);
        }
    }


}
