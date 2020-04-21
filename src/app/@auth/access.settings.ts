/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

export const authSettings = {
  guest: {
    view: [],
  },
  user: {
    parent: 'guest',
    read: 'search',
  },
  admin: {
    parent: 'user',
    create: 'save',
    remove: '*',
  },
};


// const _ACCESS_CONTROL = {

//   accessControl: {
//     guest: {
//       view: ['pages'],
//     },
//     user: {
//       parent: 'guest',
//       create: 'comments',
//     },
//     admin: {
//       parent: 'user',
//       view: ['adminPages'],
//       create: 'news',
//       remove: '*',
//     },
//   },
// }