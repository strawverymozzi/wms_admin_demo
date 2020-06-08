import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { getProgramMap } from './program-helper';

@Injectable()
export class RoleChecker {

    constructor(private router: Router) {

    }
    public isGranted(abilities: any[]) {
        const currentView = this.router.routerState.snapshot.url;
        const mapper = getProgramMap()[currentView];
        if (mapper) {
            return abilities.filter((v, i, a) => {
                return !!mapper[v];
            }).length == abilities.length;
        }
        return false
    }
}

