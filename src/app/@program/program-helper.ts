
const programMapper: any = {
    "/auth/login": {
        url: "/global/loginPage",
        windowName: null,
        insFlg: null,
        updFlg: null,
        delFlg: null
    },
}

export const NBMenuList = [];

export function setNewProgram(view: string, data) {
    programMapper[view] = data
}

export function getProgramMap(): object {
    return programMapper;
}

export class ProgramHelper {
    constructor() { }

    static getDictionaryURL(landingPath: string): string {
        return programMapper[landingPath] ? programMapper[landingPath].url : "/";
    }

    static parseProgram(returnedList: any[], insertedList: any[]) {
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
                this.parseProgram(setting["children"], menuObj["children"]);
            }
            returnedList.push(setting);
        }
    }
}
