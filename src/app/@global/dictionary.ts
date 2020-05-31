import { NgModule, ModuleWithProviders } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../@common/common-http.service';
import { Subject } from 'rxjs';
import { getProgramMap } from './program.administrator';


@NgModule()
export class Dictionary extends CommonHttpService {
    static forRoot(): ModuleWithProviders<Dictionary> {
        return {
            ngModule: Dictionary,
        };
    }
    private static currentView: string;
    constructor(private http: HttpClient, private router: Router) {
        super(http);
        this.router.events.subscribe(event => {
            Dictionary.currentView = "";
            if (event instanceof NavigationEnd) {
                if (VIEWDICTONARYMAP[event.url] && VIEWDICTONARYMAP[event.url].hasOwnProperty("dictionary")) {
                    this.getJson(Dictionary.getDictionaryUrl(event.url)).subscribe(res => {
                        Dictionary.currentView = event.url;
                        Dictionary.setViewDictionary(event.url, res["dictionary"]);
                        Dictionary.dictionaryUpdate.next({ "STATUS": "DONE" });
                    })
                }
            }
        })
    }

    public static getWord(key: string): string {
        return getProgramMap()[Dictionary.currentView].dictionary[key]
    }

    public static getCurrentView(): string {
        return this.currentView;
    }
    private static setViewDictionary(view: string, data: any) {
        getProgramMap()[view].dictionary = data;
    }
    public static getDictionaryUrl(viewName: string) {
        return getProgramMap()[viewName].url;
    }


}