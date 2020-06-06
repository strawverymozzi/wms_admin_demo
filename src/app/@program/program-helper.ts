const PROGRAMMAPPER: any = {

    "/auth/login": {
        url: "/global/loginPage",
        windowName: null,
        insFlg: null,
        updFlg: null,
        delFlg: null
    }
}

var jwt = require('jwt-simple');
const secret = 'cyy4KhQAOWuj94LtM6Yvt$FGOQb8KBN6lIXmFFG7!Yv6K#ewWCnH#Q5IS2MhxKp&';

export const NBMenuList = [];

export function setNewProgram(view: string, data) {
    PROGRAMMAPPER[view] = data
}

export function getProgramMap(): object {
    return PROGRAMMAPPER;
}

export function tokenAppendProgramMeta(token: string): string {
    var payload = jwt.decode(token, secret, false, 'HS256');
    payload["windowName"] = '';
    payload["pageRole"] =
    {
        infFlg: "",
        updFlg: "",
        delFlg: ""
    }
    return jwt.encode(payload, secret, 'HS256');
}
export class ProgramHelper {
    constructor() { }

    static getDictionaryURL(landingPath: string): string {
        return PROGRAMMAPPER[landingPath] ? PROGRAMMAPPER[landingPath].url : "/";
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
