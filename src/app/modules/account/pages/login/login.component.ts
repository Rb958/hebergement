import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AppStore, LocalData} from "../../../../shared/utils/app-store";
import {AuthService} from "../../../../shared/services/http-services/auth.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  localData: LocalData;
  appVersion: any;
  appName: any;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private notifier: NotifierService,
    private translator: TranslateService,
    private router: Router,
    private appStore: AppStore
  ) {
    this.loginForm = fb.group({});
    this.localData = this.appStore.getData();
    this.appName = this.appStore.getData().appName;
    this.appVersion = this.appStore.getData().appVersion;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  submit() {
    if(this.loginForm.valid){
      const loginData = Object.create(null);
      loginData.username = this.loginForm.value.username;
      loginData.password = this.loginForm.value.password;
      this.authService.authentication(loginData).subscribe(response => {
          if (response.code === HttpStatusCode.Ok){
            if (this.loginForm.value.remember){
              this.localData ? this.localData.keepSessionAlive = true : false;
            }
            if (this.localData){
              this.localData.token = response.result.token;
              this.localData.userName = response.result.userDetails.username;
              this.localData.userRole = response.result.roles;
              this.localData.sessionExists = true;
              this.localData.lang = navigator.language;
            }
            this.appStore.save(this.localData);
            this.router.navigateByUrl("/dashboard");
            this.notifier.notify(
              'Authentifié avec succès',
              'Notification',
              NotificationType.SUCCESS
            );
          }else{
            this.notifier.notify(
              response.message,
              'Notification',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.notifier.notify(
            'Internal server error',
            'Notification',
            NotificationType.ERROR
          );
        })
    }else{
      this.notifier.notify(
        'Invalid form',
        'Notification',
        NotificationType.WARNING
      );
    }
  }
}
