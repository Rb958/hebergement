import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../shared/services/services/user.service";
import {UserModel} from "../../../../shared/models/entity/user.model";
import {HttpStatusCode} from "@angular/common/http";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";

@Component({
  selector: 'app-enable-user',
  templateUrl: './enable-user.component.html',
  styleUrls: ['./enable-user.component.scss']
})
export class EnableUserComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<EnableUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserModel,
    private userService: UserService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
  }
  performAction(){
    this.userService.enableUser(this.data, this.data.id).subscribe(
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
  }
}
