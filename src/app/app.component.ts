/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, OnInit } from '@angular/core';
import { NbTokenLocalStorage, NbAuthToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { AnalyticsService } from './@core/utils/analytics.service';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {


  constructor(private analytics: AnalyticsService,
    private authStrategy: NbPasswordAuthStrategy,
    private tokenStorage: NbTokenLocalStorage,
  ) {

    // TODO: REMOVE BEFORE PROD
    // for demo only: init localstorage with token for demo user when login for the first time
    //this.initTestUserToken();
  }

  ngOnInit(): void {
    //this.setLocale("ko-KR");
    // this.setLocale("en-EN");
    //this.analytics.trackPageViews();
  }

  initTestUserToken() {
    //   const demoTokenInitKey = 'demo_token_initialized';
    //   const demoTokenWasInitialized = localStorage.getItem(demoTokenInitKey);
    //   const currentToken = this.tokenStorage.get();
    //   if (!demoTokenWasInitialized && !currentToken.isValid()) {
    //     // local storage is clear, let's setup demo user token for better demo experience
    //     this.tokenStorage.set(this.authStrategy.createToken<NbAuthToken>(environment.testUser.token));
    //     localStorage.setItem(demoTokenInitKey, 'true');
    //   }
  }
}
