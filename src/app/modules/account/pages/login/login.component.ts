import { CaisseService } from './../../../../shared/services/services/caisse.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AppStore, LocalData, UserDetails} from "../../../../shared/utils/app-store";
import {AuthService} from "../../../../shared/services/http-services/auth.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {Router} from "@angular/router";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy{
  loginForm: UntypedFormGroup;
  localData: LocalData;
  appVersion: any;
  appName: any;
  loading = false;

  cashierSubscription: Subscription = {} as Subscription;

  loginSubscription: Subscription = {} as Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private notifier: NotifierService,
    private translator: TranslateService,
    private router: Router,
    public appStore: AppStore,
    private cashierService: CaisseService
  ) {
    this.loginForm = fb.group({});
    this.localData = this.appStore.getData();
    this.appName = this.localData.appName;
    this.appVersion = this.localData.appVersion;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  submit() {
    this.loading = true;
    if(this.loginForm.valid){
      const loginData = Object.create(null);
      loginData.username = this.loginForm.value.username;
      loginData.password = this.loginForm.value.password;
      this.loginSubscription = this.authService.authentication(loginData).subscribe(response => {
          if (response.code === HttpStatusCode.Ok){
            this.localData.token = response.result.token;
            this.sessionInit(response);
            this.loading = false;
            this.notifier.notify(
              'Authentifié avec succès',
              'Authentification',
              NotificationType.SUCCESS
            );
          }else{
            this.loading = false;
            this.notifier.notify(
              'Echec d\'authentification',
              'Authentification',
              NotificationType.ERROR
            );
          }
        },
        error => {
        this.loading =false;
          this.notifier.notify(
            'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
            'Authentification',
            NotificationType.ERROR
          );
        })
    }else{
      this.loading = false;
      this.notifier.notify(
        'Formulaire invalide',
        'Authentification',
        NotificationType.WARNING
      );
    }
  }

  private sessionInit(response: ApiResponseModel<any>) {
    if (this.loginForm.value.remember){
      this.localData ? this.localData.keepSessionAlive = true : false;
    }
    if (this.localData){
      this.localData.token = response.result.token;
      const userDetails = new UserDetails();
      userDetails.firstname = response.result.userDetails.firstname;
      userDetails.username = response.result.userDetails.username;
      userDetails.role = response.result.roles;
      userDetails.userId = response.result.userDetails.id;
      this.localData.userDetails = userDetails;
      if (response.result.roles.includes("ROLE_ADMIN")){
        this.localData.hasCashierOpened = true;
      }
      this.localData.sessionExists = true;
      this.localData.lang = navigator.language;
    }
    this.appStore.save(this.localData);
    if (!response.result.roles.includes("ROLE_ADMIN")){
      this.checkCashierOpened(this.localData.userDetails?.userId);
    }else{
      this.router.navigateByUrl("/dashboard", {});
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription){
      this.loginSubscription.unsubscribe;
    }
    if (this.cashierSubscription){
      this.cashierSubscription.unsubscribe;
    }
  }

  private checkCashierOpened(userId: any) {
    this.cashierSubscription = this.cashierService.checkCashierHasOpened(userId).subscribe(
      apiResponse => {
        if (apiResponse.code == HttpStatusCode.Ok.valueOf() && apiResponse.result){
          this.localData.hasCashierOpened = true;
          this.appStore.save(this.localData);
          this.router.navigateByUrl('/dashboard');
        }else{
          this.notifier.notify(
            'Votre caisse n\'est pas ouverte. Veuillez proceder a l\'ouverture de votre caisse avant toute action sur la plateforme',
            'Ouverture de caisse',
            NotificationType.INFO
          );
          this.router.navigateByUrl('/finance/caisse/open');
        }
      }
    );
  }
}
