import { Operation, and, comparison, eq, ge, inList, or, outList } from "rsql-builder";
import * as escape from "rsql-builder/dist/escape-value";
import { WmsForm } from '../../common-wms/_form/wms-form';

export function between(...range: any): Operation {
    return new Operation(new escape.EscapedValue('(' + range + ')'), "=bt=");
}

export class RCVFORM extends WmsForm {
    constructor() {
        super();
        this.RCVSTA = '';
        this.RCVTYP = '';
        this.FDATE1 = '';
        this.TODAT1 = '';
        this.PTNKEY = '';
        this.PTNRNM = '';
        this.FDATE2 = '';
        this.TDATE2 = '';
        this.SKUKEY = '';
        this.SKUNAM = '';
    }

    public RCVSTA: string;
    public RCVTYP: string;
    public FDATE1: string;
    public TODAT1: string;
    public PTNKEY: string;
    public PTNRNM: string;
    public FDATE2: string;
    public TDATE2: string;
    public SKUKEY: string;
    public SKUNAM: string;


    public toRSQL(): string {
        return and(
            ...[
                this.SKUKEY ? comparison('SKUKEY', eq(this.SKUKEY)) : '',
                this.SKUNAM ? comparison('TYPEOWNER', eq(this.SKUNAM)) : '',
                this.RCVSTA ? comparison('RCVSTA', eq(this.RCVSTA)) : '',
                this.RCVTYP ? comparison('RCVTYP', eq(this.RCVTYP)) : '',
                this.FDATE1 ? comparison('DATERANGE', between(this.FDATE1, this.TODAT1)) : '',
                this.FDATE2 ? comparison('DATERANGE2', between(this.FDATE2, this.TDATE2)) : '',
                this.PTNKEY ? comparison('PTNKEY', eq(this.PTNKEY)) : '',
                this.PTNRNM ? comparison('PTNRNM', eq(this.PTNRNM)) : '',
                this.SKUKEY ? comparison('SKUKEY', eq(this.SKUKEY)) : '',
                this.SKUNAM ? comparison('SKUNAM', eq(this.SKUNAM)) : '',
            ].filter((v) => !!v == true)
        );
    }
}
export class RCVSUBFORM extends WmsForm {
    constructor() {
        super();
        this.RCVNUM = '';
        this.PCODNM = '';
        this.MALLID = '';
        this.OORDID = '';
        this.RCODNM = '';
        this.BOLNUM = '';
        this.USERID = '';
        this.ERPNUM = '';
        this.INVNUM = '';
        this.USNAME = '';
    }
    public RCVNUM: string;
    public PCODNM: string;
    public MALLID: string;
    public OORDID: string;
    public RCODNM: string;
    public BOLNUM: string;
    public USERID: string;
    public ERPNUM: string;
    public INVNUM: string;
    public USNAME: string;


    public toRSQL(): string {
        return and(
            ...[
                this.RCVNUM ? comparison('RCVNUM', eq(this.RCVNUM)) : '',
                this.PCODNM ? comparison('PCODNM', eq(this.PCODNM)) : '',
                this.MALLID ? comparison('MALLID', eq(this.MALLID)) : '',
                this.OORDID ? comparison('OORDID', eq(this.OORDID)) : '',
                this.RCODNM ? comparison('RCODNM', eq(this.RCODNM)) : '',
                this.BOLNUM ? comparison('BOLNUM', eq(this.BOLNUM)) : '',
                this.USERID ? comparison('USERID', eq(this.USERID)) : '',
                this.ERPNUM ? comparison('ERPNUM', eq(this.ERPNUM)) : '',
                this.INVNUM ? comparison('INVNUM', eq(this.INVNUM)) : '',
                this.USNAME ? comparison('USNAME', eq(this.USNAME)) : '',
            ].filter((v) => !!v == true)
        )
    }
}
export class RCVDETAILFORM extends WmsForm {
    constructor() {
        super();
        this.companyName = '';
        this.name = '';
        this.phone1 = '';
        this.phone2 = '';
        this.address1 = '';
        this.address2 = '';
    }

    public companyName: string;
    public name: string;
    public phone1: string;
    public phone2: string;
    public address1: string;
    public address2: string;

    public toRSQL(): string {
        return and(
            ...[
                this.companyName ? comparison('url', eq(this.companyName)) : '',
                this.name ? comparison('name', eq(this.name)) : '',
                this.phone1 ? comparison('phone1', eq(this.phone1)) : '',
                this.phone2 ? comparison('phone2', eq(this.phone2)) : '',
                this.address1 ? comparison('address1', eq(this.address1)) : '',
                this.address2 ? comparison('address2', eq(this.address2)) : '',
            ].filter((v) => !!v == true)
        );
    }

}