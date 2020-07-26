import { Injectable } from '@angular/core'
import { COMMON_CONFIG } from '../@common/common.config';
import * as jwt_decode from "jwt-decode"

@Injectable({ providedIn: 'root' })
export class RoleChecker {

    private pageRole: any;
    // {
    //     "updFlg": "TEakWBLbaGBK6svQPupZBg==",
    //     "delFlg": "/gXDdQxprXZcu9HgRIA+OA==",
    //     "infFlg": "c+ykL9OeM2NMlBaLwUGC+g=="
    //   },
    constructor() {
        const token = localStorage.getItem(COMMON_CONFIG.ACCESS_TOKEN);
        const decoded = jwt_decode(token);
        this.pageRole = decoded[COMMON_CONFIG.PAGEROLE];
    }
    public isGranted(abilities: any[]) {
        if (this.pageRole) {
            return abilities.filter((v, i, a) => {
                return !!this.pageRole[v];
            }).length == abilities.length;
        }
        return false
    }
}

