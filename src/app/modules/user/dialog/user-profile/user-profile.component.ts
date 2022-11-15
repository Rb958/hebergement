import { UserModel } from './../../../../shared/models/entity/user.model';
import { LocalData, AppStore } from './../../../../shared/utils/app-store';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { UserService } from 'src/app/shared/services/services/user.service';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    const userId = this.localData.userDetails?.userId;
    this.subscription = this.userService.getSingleUser(userId).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.currentUser = apiResponse.result;
          this.initForm(this.currentUser);
        }
      }
    );
    this.initFormPassword();
  }



  private initForm(user: UserModel) {
    this.userForm = this.fb.group({
      firstname: [user.firstname],
      lastname: [user.lastname, Validators.required],
      phone: [user.phone],
      email: [user.email, Validators.required],
      username: [user.username, Validators.required]
    });
  }

  private initFormPassword() {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  sumbitForm() {
    if (this.userForm.valid){
      this.userService.updateUser(this.userForm.value, this.localData.userDetails?.userId).subscribe(
        apiResult => {
          if (apiResult.code === HttpStatusCode.Ok.valueOf()){
            this.router.navigateByUrl('/dashboard');
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
            this.router.navigateByUrl('/dashboard');
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
