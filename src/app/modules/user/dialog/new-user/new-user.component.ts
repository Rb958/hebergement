import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../shared/services/services/user.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm: UntypedFormGroup = {} as UntypedFormGroup;

  constructor(
    private matDialogRef: MatDialogRef<NewUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }



  private initForm() {
    if (!this.data.edition){
      this.userForm = this.fb.group({
        firstname: [''],
        lastname: ['', Validators.required],
        phone: [''],
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }else{
      this.userForm = this.fb.group({
        firstname: [this.data.user.firstname],
        lastname: [this.data.user.lastname, Validators.required],
        phone: [this.data.user.phone],
        username: [this.data.user.username, Validators.required],
        password: ['', Validators.required]
      })
    }
  }

  sumbitForm() {
    if (this.userForm.valid){
      if (!this.data.edition){
        this.userService.createUser(this.userForm.value).subscribe(
          apiResult => {
            if (apiResult.code === HttpStatusCode.Ok.valueOf()){
              this.matDialogRef.close(apiResult.result);
              this.notifier.notify(
                apiResult.message,
                'Notification',
                NotificationType.SUCCESS
              );
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
              'Erreur de communication avec le serveur',
              'Notification',
              NotificationType.ERROR
            );
          }
        );
      }else{
        this.userService.updateUser(this.userForm.value).subscribe(
          apiResult => {
            if (apiResult.code === HttpStatusCode.Ok.valueOf()){
              this.matDialogRef.close(apiResult.result);
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
              'Erreur de communication avec le serveur',
              'Notification',
              NotificationType.ERROR
            );
          }
        );
      }
    }else{
      this.notifier.notify(
        'Formulaire invalide',
        'Notification',
        NotificationType.WARNING
      );
    }
  }
}
