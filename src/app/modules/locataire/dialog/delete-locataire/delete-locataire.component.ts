import {Component, Inject, OnInit} from '@angular/core';
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocataieSociete} from "../../../../shared/models/entity/locataire.model";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";

@Component({
  selector: 'app-delete-locataire',
  templateUrl: './delete-locataire.component.html',
  styleUrls: ['./delete-locataire.component.scss']
})
export class DeleteLocataireComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteLocataireComponent>,
    @Inject(MAT_DIALOG_DATA) private locataire: LocataieSociete,
    private locataireService: LocataireService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void { }

  performAction() {
    this.locataireService.deleteLocataireSociete(this.locataire.id).subscribe(
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
