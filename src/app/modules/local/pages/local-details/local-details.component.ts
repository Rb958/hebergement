import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from './../../../../shared/services/services/upload.service';
import { LocataireParticulierModel } from './../../../../shared/models/entity/locataire.model';
import { catchError, map, of, startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataStateEnum, DataStateProcessing } from './../../../../shared/utils/data-processing-state';
import { Observable } from 'rxjs';
import { LocalModel } from './../../../../shared/models/entity/local.model';
import { LocalService } from './../../../../shared/services/services/local.service';
import { Component, OnInit } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Env } from 'src/app/shared/utils/Env';

@Component({
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.scss']
})
export class LocalDetailsComponent implements OnInit {

  currentLocal$: Observable<DataStateProcessing<LocalModel>> = {} as Observable<DataStateProcessing<LocalModel>>;
  constructor(
    private localService: LocalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const currentLocalId = this.activatedRoute.snapshot.paramMap.get("id");
    this.currentLocal$ = this.localService.findById(currentLocalId).pipe(
      map(response => {
        if (response.code === HttpStatusCode.Ok){
          return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
        }else {
          return {dataState: DataStateEnum.ERROR, message: response.message}
        }
      }
    ),
    startWith({dataState: DataStateEnum.LOADING}),
    catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );
  }

}
