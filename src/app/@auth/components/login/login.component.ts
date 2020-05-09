/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
  NbTokenLocalStorage,
  NbPasswordAuthStrategy,
  NbAuthToken,
} from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { NbThemeService } from '@nebular/theme';
import { EMAIL_PATTERN } from '../constants';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoginComponent implements OnInit {

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.login.redirectDelay');
  showMessages: any = this.getConfigValue('forms.login.showMessages');
  strategy: string = this.getConfigValue('forms.login.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');
  rememberMe = this.getConfigValue('forms.login.rememberMe');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    protected router: Router,
    protected initUserService: InitUserService,
    private tokenStorage: NbTokenLocalStorage,
    private authStrategy: NbPasswordAuthStrategy,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      rememberMe: this.fb.control(false),
    });
  }

  login(): void {
    this.user = this.loginForm.value;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    // this.http.post('http://www.jflab.co.kr:18000/auth/login', { 'tenant': '1000', 'usercd': 'TEST_USER', 'password': '1234' }).subscribe(
    //   res => {
    //     const demoTokenInitKey = 'demo_token_initialized'
    //     const token = res['token'];
    //     setTimeout(() => {
    //       return this.router.navigateByUrl('/adminPages');
    //     }, this.redirectDelay);
    //     this.tokenStorage.set(this.authStrategy.createToken<NbAuthToken>(token));
    //     localStorage.setItem(demoTokenInitKey, 'true');
    //     localStorage.setItem('access', token["access_token"]);
    //     localStorage.setItem('refresh', token["refresh_token"]);
    //   }

    // )
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {

      const demoTokenInitKey = 'demo_token_initialized';
      const demoTokenWasInitialized = localStorage.getItem(demoTokenInitKey);
      const currentToken = this.tokenStorage.get();
      if (!demoTokenWasInitialized && !currentToken.isValid()) {
        // local storage is clear, let's setup demo user token for better demo experience
        let token;
        if (this.user.email == 'user@user.com') {
          token = environment.testUser.token;
          setTimeout(() => {
            return this.router.navigateByUrl('/pages');
          }, this.redirectDelay);
        } else if (this.user.email == 'admin@admin.com') {
          token = environment.testAdminUser.token;
          setTimeout(() => {
            return this.router.navigateByUrl('/adminPages');
          }, this.redirectDelay);
        }
        this.tokenStorage.set(this.authStrategy.createToken<NbAuthToken>(token));
        localStorage.setItem(demoTokenInitKey, 'true');
      }
      // if (result.isSuccess()) {
      //   this.messages = result.getMessages();
      //   this.initUserService.initCurrentUser().subscribe();
      // } else {
      //   this.errors = result.getErrors();
      // }

      // const redirect = result.getRedirect();
      // if (redirect) {
      //   setTimeout(() => {
      //     return this.router.navigateByUrl(redirect);
      //   }, this.redirectDelay);
      // }

      this.submitted = false;
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
