import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocataieSociete} from "../../../../shared/models/entity/locataire.model";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";

@Component({
  selector: 'app-delete-locataire-particulier',
  templateUrl: './delete-locataire-particulier.component.html',
  styleUrls: ['./delete-locataire-particulier.component.scss']
})
export class DeleteLocataireParticulierComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteLocataireParticulierComponent>,
    @Inject(MAT_DIALOG_DATA) private locataire: LocataieSociete,
    private locataireService: LocataireService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void { }

  performAction() {
    this.locataireService.deleteLocataireParticulier(this.locataire.id).subscribe(
      result => {
        if (result.code == 200){
          this.dialogRef.close(true);
        }else{
          this.dialogRef.close(false);
        }
      },
      error => {
        this.dialogRef.close(false);
      }
    );
  }
}
