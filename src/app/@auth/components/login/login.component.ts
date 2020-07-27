/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
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

  get tenantID() { return this.loginForm.get('tenant'); }
  get userID() { return this.loginForm.get('usercd'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }


  constructor(
    @Inject(NB_AUTH_OPTIONS) protected option = {},
    private fb: FormBuilder,
    protected router: Router,
    public loginService: LoginService,
    protected activatedroute: ActivatedRoute,
  ) {
    const storageLanguage = localStorage.getItem("language");
    this.currentLanguage = storageLanguage ? storageLanguage : this.initLanguage();
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
    this.loginService.loginUser(this.user).subscribe(
      res => {
        const result = this.loginService.handleLoginResult(res);
        this.router.navigateByUrl('/adminPages');
      },
      error => {
        notify(
          {
            message: error.error,
            position: "top",
            closeOnClick: true,
            closeOnOutsideClick: true
          }, "error", 1000);
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      tenant: this.fb.control('1000'),
      usercd: this.fb.control('TEST_USER'),
      password: this.fb.control('1234'),
      rememberMe: this.fb.control(false),
    });
  }
}