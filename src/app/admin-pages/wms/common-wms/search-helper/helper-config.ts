import { PTNKEYGRIDCONFIG, SKUKEYGRIDCONFIG } from './grid-config';
import { PTNKEYFORM, SKUKEYFORM } from '../_form/common-wms-form';
import { REGISTRY } from '../../../../../environments/environment';

export function setInitValue(key: string, data: any) {
    HELPERCONFIG[key].param.setInitValue(data)
}
export const HELPERCONFIG = {
    PTNKEY: {
        id: 'PTNKEY',
        title: '파트너 검색',
        gridConfig: PTNKEYGRIDCONFIG,
        pkCol: 'ID',
        url: REGISTRY.PTNKEYGRID.GET,
        param: new PTNKEYFORM(),
    },
    SKUKEY: {
        id: 'SKUKEY',
        title: '품번코드 검색',
        gridConfig: SKUKEYGRIDCONFIG,
        pkCol: 'ID',
        url: REGISTRY.SKUKEYGRID.GET,
        param: new SKUKEYFORM(),
    }
}