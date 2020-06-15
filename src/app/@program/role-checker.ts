import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { getProgramMap } from './program.registry';
import { COMMON_CONFIG } from '../@common/common.config';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable({ providedIn: 'root' })
export class RoleChecker {

    private payload: any;
    constructor(private router: Router) {
        const token = localStorage.getItem(COMMON_CONFIG.ACCESS_TOKEN);
        const decoded = jsonwebtoken.decode(token);
        this.payload = decoded[COMMON_CONFIG.PAGEROLE];
    }
    public isGranted(abilities: any[]) {
        if (this.payload) {
            return abilities.filter((v, i, a) => {
                return !!this.payload[v];
            }).length == abilities.length;
        }
        return false
    }
}

