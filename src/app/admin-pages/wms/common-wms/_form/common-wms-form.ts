import { and, comparison, eq } from "rsql-builder";
import { WmsForm } from './wms-form';

export class PTNKEYFORM extends WmsForm {

    constructor() {
        super();
        this.TENANT = '';
        this.TYPEOWNER = '';
        this.PTNKEY = '';
        this.PTNRNM = '';
        this.ACTFLG = '';
        this.BSNUMBER = '';
    }

    public TENANT: string = '';
    public TYPEOWNER: string = '';
    public PTNKEY: string = '';
    public PTNRNM: string = '';
    public ACTFLG: string = '';
    public BSNUMBER: string = '';

    public toRSQL(): string {
        return and(
            ...[
                this.TENANT ? comparison('TENANT', eq(this.TENANT)) : '',
                this.TYPEOWNER ? comparison('TYPEOWNER', eq(this.TYPEOWNER)) : '',
                this.PTNKEY ? comparison('PTNKEY', eq(this.PTNKEY)) : '',
                this.PTNRNM ? comparison('PTNRNM', eq(this.PTNRNM)) : '',
                this.ACTFLG ? comparison('ACTFLG', eq(this.ACTFLG)) : '',
                this.BSNUMBER ? comparison('BSNUMBER', eq(this.BSNUMBER)) : ''
            ].filter((v) => !!v == true)
        )
    }
}

export class SKUKEYFORM extends WmsForm {
    constructor() {
        super();
        this.SKUKEY = '';
        this.SKUNAM = '';
    }
    public SKUKEY: string = '';
    public SKUNAM: string = '';

    public toRSQL(): string {
        return and(
            ...[
                this.SKUKEY ? comparison('SKUKEY', eq(this.SKUKEY)) : '',
                this.SKUNAM ? comparison('TYPEOWNER', eq(this.SKUNAM)) : '',
            ].filter((v) => !!v == true)
        );
    }

}