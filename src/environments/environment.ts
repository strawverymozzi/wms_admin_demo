/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.



//local
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api',
  defaultLang: window.navigator.language,
};
export const REGISTRY: any = {
  LOGIN: {
    INIT: '/auth/login?language=' + environment.defaultLang,
    LOGINUSER: '/auth/loginUser'
  },
  ADMINMENU: {
    INIT: '/menu/ADMINMENU',
  },
  MASTERGRID: {
    GET: '/grid/HEADGRID',
    POST: '/grid/SAVEHEADGRID',
    UPDATE: '',
    DELETE: '',
  },
  DETAILGRID: {
    GET: '/grid/ITEMGRID',
  }
}

//prod
// export const environment = {
//   production: false,
//   apiUrl: 'http://www.jflab.co.kr:18000',
//   defaultLang: window.navigator.language,

// };
// export const REGISTRY: any = {
//   LOGIN: {
//     INIT: '/auth/login?language=' + environment.defaultLang,
//     LOGINUSER: '/auth/login'
//   },
//   ADMINMENU: {
//     INIT: '/api/v1/mdm/menu',
//   },
//   MASTERGRID: {
//     GET: "/api/v1/receive/rcv?criteria=tenant=='1000';rcvKey=='99999';fdds=bt=(2020-04-21,2020-08-01)",
//     POST: '/grid/SAVEHEADGRID',
//     UPDATE: '',
//     DELETE: '',

//   },
// }

export function getURI(uri: string): string {
  return environment.apiUrl + uri;
}



