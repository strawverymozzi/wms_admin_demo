/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
export const environment = {
  production: false,
  baseUrl: '',
  // MD: 'http://www.jflab.co.kr:18000',
  // WM: 'http://www.jflab.co.kr:18001',
  MD: 'https://aqueous-sierra-56466.herokuapp.com/',
  WM: 'https://aqueous-sierra-56466.herokuapp.com/',
  defaultLang: window.navigator.language,
};

export const REGISTRY: any = {
  LOGIN: {
    INIT: `${environment.MD}/auth/login?language=${environment.defaultLang}`,
    LOGINUSER: '${environment.MD}/auth/login'
  },
  ADMINMENU: {
    INIT: `${environment.MD}/api/v1/mdm/menu`,
  },
  RCVGRID: {
    POST: `${environment.WM}/api/v1/rec/receive/save`,
  },
  PTNKEYGRID: {
    GET: `${environment.WM}/api/v1/searchHelp/SHPTNGRID?`,
  },
  SKUKEYGRID: {
    GET: `${environment.WM}/api/v1/searchHelp/SHSKUGRID?`,
  },
  RCVMASTERGRID: {
    GET: `${environment.WM}/api/v1/rec/receive/listRcv?criteria=`,
    POST: `${environment.WM}/api/v1/rec/receive/saveRcv`,
    DELETE: `${environment.WM}/api/v1/rec/receive/deleteRcv`,
  },
  RCVDETAILGRID: {
    GET: `${environment.WM}/api/v1/rec/receive/listRcvDetail?criteria=`,
    POST: `${environment.WM}/api/v1/rec/receive/saveRcvDetail`,
    DELETE: `${environment.WM}/api/v1/rec/receive/deleteRcvDetail`,
  },
}


