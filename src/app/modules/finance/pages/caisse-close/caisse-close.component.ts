import { NotifierService } from './../../../../shared/components/notification/notifier.service';
import { HttpStatusCode } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CaisseService } from './../../../../shared/services/services/caisse.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';

@Component({
  selector: 'app-caisse-close',
  templateUrl: './caisse-close.component.html',
  styleUrls: ['./caisse-close.component.scss']
})
export class CaisseCloseComponent implements OnInit {
  
  loading: boolean = false;

  closeSubscription: Subscription = {} as Subscription;

  constructor(
    private dialogRef: MatDialogRef<CaisseCloseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private notifierService: NotifierService,
    private caisseService: CaisseService
  ) { }

  ngOnInit(): void {}

  process(){
    this.loading = true;
    this.closeSubscription = this.caisseService.closeCaisse(this.data).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.loading = false;
          this.notifierService.notify(
            'La requete de fermeture de votre caisse a été soumit avec succès',
            'Cloture de caisse',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.loading = false;
          this.notifierService.notify(
            'Erreur lors de la colutre de cette caisse',
            'Cloture de caisse',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.loading = false;
        this.notifierService.notify(
          'Probleme de communication avec le serveur',
          'Cloture de caisse',
          NotificationType.ERROR
        );
      }
    );
  }
}
