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
  apiUrl: 'http://localhost:3001/api',
  testUser: {
    // tslint:disable
    token: {
      expires_in: 3600000,
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQFVzZXIiLCJyb2xlIjoidXNlciIsIm5iZiI6MTU2NDA2MTQ1NywiZXhwIjoxNTk1NjgzODU3LCJpc3MiOiJpc3N1ZXJfc2FtcGxlIiwiYXVkIjoiYXVkaWVuY2Vfc2FtcGxlIn0.PSBx2td3euruX6xtYp0l6S6EqGkN-bT-EU969OTV0eE',
    },
    // tslint:enable
    email: 'user@user.user',
  },
  testAdminUser: {
    // tslint:disable
    token: {
      expires_in: 3600000,
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE1NjQwNjE0NTcsImV4cCI6MTU5NTY4Mzg1NywiaXNzIjoiaXNzdWVyX3NhbXBsZSIsImF1ZCI6ImF1ZGllbmNlX3NhbXBsZSJ9.S4M0nqajbE5B8w7DQNpRreSZjrfH6QLkqmqUxIg2v6A',
    },
    // tslint:enable
    email: 'admin@admin.admin',
  },
};

export const environment1 = {
  production: false,
  apiUrl: 'http://www.jflab.co.kr:18000/'
};

