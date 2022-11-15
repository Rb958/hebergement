import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AppStore, LocalData} from "../../../../shared/utils/app-store";
import {UserModel} from "../../../../shared/models/entity/user.model";
import {UserService} from "../../../../shared/services/services/user.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-init-pass',
  templateUrl: './init-pass.component.html',
  styleUrls: ['./init-pass.component.scss']
})
export class InitPassComponent implements OnInit {

  userForm: FormGroup = {} as FormGroup;
  passwordForm: FormGroup = {} as FormGroup;
  subscription: Subscription = {} as Subscription;

  localData: LocalData = {} as LocalData;
  currentUser: UserModel = {} as UserModel;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private notifier: NotifierService,
    private appStore: AppStore,
    private router: Router,
    private dialogRef: MatDialogRef<InitPassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.currentUser = this.data;
    const userId = this.localData.userDetails?.userId;
    // this.subscription = this.userService.getSingleUser(userId).subscribe(
    //   apiResponse => {
    //     if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
    //       this.currentUser = apiResponse.result;
    //     }
    //   }
    // );
    this.initFormPassword();
  }

  private initFormPassword() {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  updatePassword(currentUser: UserModel){
    if (this.passwordForm.valid){

      if(this.passwordForm.value.newPassword != this.passwordForm.value.confirmPassword){
        this.notifier.notify(
          'Les mots de passe ne sont pas identiques. Veuiller réessayer',
          'Notification',
          NotificationType.ERROR
        );
        return;
      }

      currentUser.password = this.passwordForm.value.newPassword;
      this.userService.passwordUpdate(currentUser, this.localData.userDetails?.userId).subscribe(
        apiResult => {
          if (apiResult.code === HttpStatusCode.Ok.valueOf()){
            this.dialogRef.close(true);
          }else{
            this.notifier.notify(
              apiResult.message,
              'Notification',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.notifier.notify(
            'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
            'Notification',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.notifier.notify(
        'Formulaire invalide',
        'Notification',
        NotificationType.WARNING
      );
    }
  }

}
