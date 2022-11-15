import { BailModel } from './../../../../shared/models/entity/bail.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { startWith } from 'rxjs';
import { DataStateEnum } from './../../../../shared/utils/data-processing-state';
import { HttpStatusCode } from '@angular/common/http';
import { map } from 'rxjs';
import { BailService } from './../../../../shared/services/services/bail.service';
import { LocalService } from './../../../../shared/services/services/local.service';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DataStateProcessing } from 'src/app/shared/utils/data-processing-state';
import { LocalModel } from 'src/app/shared/models/entity/local.model';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';

@Component({
  selector: 'app-change-local',
  templateUrl: './change-local.component.html',
  styleUrls: ['./change-local.component.scss']
})
export class ChangeLocalComponent implements OnInit {

  reservationForm: FormGroup = {} as FormGroup;

  locals$?: Observable<DataStateProcessing<LocalModel[]>> | null;

  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ChangeLocalComponent>,
    @Inject(MAT_DIALOG_DATA) private bail: BailModel,
    private fb: FormBuilder,
    private localService: LocalService,
    private bailService: BailService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    const search = Object.create(null);
    search.startDate = new Date();
    this.locals$ = this.localService.findBail(search).pipe(
      map(apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          return {dataState: DataStateEnum.LOADED, data: apiResponse.result};
        }else{
          return {dataState: DataStateEnum.ERROR, message: apiResponse.message};
        }
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, message: error.error}))
    );
    this.reservationForm = this.fb.group({
      local: this.fb.group({
        id: ['', Validators.required]
      })
    });
  }

  sumbitForm(){
    if(this.reservationForm.valid){
      const local = Object.create(null);
      local.id = parseInt(this.reservationForm.value.local.id);
      this.bailService.changeLocal(local, this.bail.id).subscribe(
        apiResponse => {
          if (apiResponse.code == 200){
            this.notifierService.notify(
              'Local réservé avec succes',
              'Enregistrement d\'un bail',
              NotificationType.SUCCESS
            );
            this.loading = false;
            this.dialogRef.close(apiResponse.result);
          }else{
            this.loading = false;
            this.notifierService.notify(
              'Erreur lors de la creation de la reservation. Veuiller rééssayer',
              'Enregistrement d\'un bail',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.loading = false;
          this.notifierService.notify(
            'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
            'Enregistrement d\'un bail',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.loading = false;
      this.notifierService.notify(
        'Veuiller renseigner tous les champs obligatoire',
        'Formulaire invalide',
        NotificationType.WARNING
      );
    }
  }

}
