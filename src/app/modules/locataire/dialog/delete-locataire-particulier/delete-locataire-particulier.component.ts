import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocataieSociete} from "../../../../shared/models/entity/locataire.model";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import { NotificationType } from 'src/app/shared/components/notification/notification-type';

@Component({
  selector: 'app-delete-locataire-particulier',
  templateUrl: './delete-locataire-particulier.component.html',
  styleUrls: ['./delete-locataire-particulier.component.scss']
})
export class DeleteLocataireParticulierComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteLocataireParticulierComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private locataireService: LocataireService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void { }

  performAction() {
    this.locataireService.deleteLocataireParticulier(this.data.locataire.id).subscribe(
      result => {
        if (result.code == 200){
          this.dialogRef.close(true);
        }else{
          this.notifier.notify(
            result.message,
            'Suppression d\'un locataire',
            NotificationType.ERROR
          )
          this.dialogRef.close(false);
        }
      },
      error => {
        this.notifier.notify(
          'Erreur inconnue lor de la suppression d\'un locataire',
          'Suppression d\'un locataire',
          NotificationType.ERROR
        )
        this.dialogRef.close(false);
      }
    );
  }
}
