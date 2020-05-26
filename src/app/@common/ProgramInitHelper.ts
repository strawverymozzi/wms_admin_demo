import { Injectable } from '@angular/core';

const _PROGRAMBOOK = {
    "/adminPages/CM/application3": {
        url: "/v1/receive",
        windowName: "rcv",
        insFlg: "123",
        updFlg: "12312",
        delFlg: "123123"
    }
}
@Injectable({ providedIn: "root" })
export class ProgramInitHelper {
    constructor() {
    }
    public setProgram(key, value) {
        _PROGRAMBOOK[key] = value
    }
    public getInitURL(key) {
        return _PROGRAMBOOK[key].url;
    }
}