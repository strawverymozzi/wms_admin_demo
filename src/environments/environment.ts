/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: '',
  MD: 'http://www.jflab.co.kr:18000',
  WM: 'http://www.jflab.co.kr:18001',
  // M`D: 'http://localhost:3001',
  // WM: 'http://localhost:3001',`
  defaultLang: window.navigator.language,
};

export const REGISTRY: any = {
  LOGIN: {
    INIT: `${environment.MD}/auth/login?language=${environment.defaultLang}`,
    LOGINUSER: `${environment.MD}/auth/login`
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



