import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserModel} from "../../../../shared/models/entity/user.model";
import {UserService} from "../../../../shared/services/services/user.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserModel,
    private userService: UserService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
  }
  performAction(){
    this.userService.deleteUser(this.data.id).subscribe(
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
          'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
          'Notification',
          NotificationType.ERROR
        );
      }
    );
  }
}
