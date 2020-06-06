/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
const _INITPAGEURL = '/global/loginPage';

import { ChangeDetectionStrategy, Component, Inject, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbTokenLocalStorage,
  NbAuthToken,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import notify from 'devextreme/ui/notify';
import { LoginService } from './login.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService]
})

export class NgxLoginComponent implements OnInit {

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;
  languages: any = {
    "ko-KR": "한국어",
    "en-US": "영어",
    "zn-CN": "중국어",
    "ja-JP": "일본어",
    "vi-VN": "베트남어",
    "id-ID": "인니어"
  }
  langKeys = Object.keys(this.languages);
  currentLanguage: string = "ko-KR";

  get tenantID() { return this.loginForm.get('tenantID'); }
  get userID() { return this.loginForm.get('userID'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }


  constructor(
    @Inject(NB_AUTH_OPTIONS) protected option = {},
    private fb: FormBuilder,
    protected router: Router,
    public loginService: LoginService,
    private tokenStorage: NbTokenLocalStorage,
    private authStrategy: NbPasswordAuthStrategy,
  ) {
    const storageLanguage = localStorage.getItem("language");
    this.currentLanguage = storageLanguage ? storageLanguage : this.initLanguage();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      tenantID: this.fb.control(''),
      userID: this.fb.control(''),
      password: this.fb.control(''),
      rememberMe: this.fb.control(false),
    });
  }

  initLanguage(): string {
    localStorage.setItem("language", navigator.language);
    return navigator.language;
  }

  changeLanguage(langName: string) {
    localStorage.setItem("language", langName);
    window.location.reload();
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user = this.loginForm.value;
    this.user["language"] = this.currentLanguage;

    //delete on serverTest
    this.user["token"] = {
      "access_token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDAwMCIsInRlbmFudCI6IjEwMDAiLCJ1c2VySWQiOiJURVNUX1VTRVIiLCJmdWxsTmFtZSI6Iu2FjOyKpO2KuOycoOyggCIsInBhZ2VSb2xlIjp7ImluZkZsZyI6IiIsInVwZEZsZyI6IiIsImRlbEZsZyI6IiJ9LCJsYW5ndWFnZSI6ImtvLUtSIiwiaWF0IjoxNTg5NzEzOTUxLCJleHAiOjE1ODk3MTc1NTF9.ab4kxvQbzvBIkvOLqXyRGShO7J8Eplh5gG7VQfl_mtA',
      "refresh_token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDAwMCIsInRlbmFudCI6IjEwMDAiLCJ1c2VySWQiOiJURVNUX1VTRVIiLCJmdWxsTmFtZSI6Iu2FjOyKpO2KuOycoOyggCIsInBhZ2VSb2xlIjp7ImluZkZsZyI6IiIsInVwZEZsZyI6IiIsImRlbEZsZyI6IiJ9LCJsYW5ndWFnZSI6ImtvLUtSIiwiaWF0IjoxNTg5NzEzOTUxLCJleHAiOjE1OTIzMDU5NTF9.fquXGAlZSS4Z3Tm4Nnm7f4ca_KM1IGK8tUt2qL1rLyQ',
    }
    this.tokenStorage.set(this.authStrategy.createToken<NbAuthToken>(this.user["token"]));
    //
    this.loginService.loginUser(this.user).subscribe(res => {
      const result = this.loginService.handleLoginResult(res);
      result ?
        setTimeout(() => {
          return this.router.navigateByUrl('/adminPages');
        }) :
        notify(
          {
            message: "nope",
            position: "center",
            closeOnClick: true,
            closeOnOutsideClick: true
          }, "error", 1000);
    });

  }
}