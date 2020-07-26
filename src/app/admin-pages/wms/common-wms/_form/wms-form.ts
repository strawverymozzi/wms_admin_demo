export abstract class WmsForm {
    constructor() {
    }
    setInitValue(dataObject: any) {
        for (let key of Object.keys(this)) {
            this[key] = dataObject[key] || '';
        }
    }
    abstract toRSQL(): string;

}
