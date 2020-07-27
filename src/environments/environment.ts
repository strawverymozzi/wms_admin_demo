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
  // apiUrl: 'http://www.jflab.co.kr',
  apiUrl: 'http://localhost',
  defaultLang: window.navigator.language,
};

export const REGISTRY: any = {
  LOGIN: {
    INIT: ':8000/auth/login?language=' + environment.defaultLang,
    LOGINUSER: ':8000/auth/login'
  },
  ADMINMENU: {
    INIT: ':8000/api/v1/mdm/menu',
  },
  RCVGRID: {
    POST: ':18001/api/v1/rec/receive/save',
  },
  PTNKEYGRID: {
    GET: ':18001/api/v1/searchHelp/SHPTNGRID?',
  },
  SKUKEYGRID: {
    GET: ':18001/api/v1/searchHelp/SHSKUGRID?',
  },
  RCVMASTERGRID: {
    GET: ':18001/api/v1/rec/receive/listRcv?criteria=',
    POST: ':18001/api/v1/rec/receive/saveRcv',
    DELETE: ':18001/api/v1/rec/receive/deleteRcv',
  },
  RCVDETAILGRID: {
    GET: ':18001/api/v1/rec/receive/listRcvDetail?criteria=',
    POST: ':18001/api/v1/rec/receive/saveRcvDetail',
    DELETE: ':18001/api/v1/rec/receive/deleteRcvDetail',
  },
}

export function getURI(uri: string): string {
  return environment.apiUrl + uri;
}



