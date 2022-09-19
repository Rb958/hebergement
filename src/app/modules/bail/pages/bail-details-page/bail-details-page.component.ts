import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { BailModel } from 'src/app/shared/models/entity/bail.model';
import { BailService } from 'src/app/shared/services/services/bail.service';
import { DataStateProcessing, DataStateEnum } from 'src/app/shared/utils/data-processing-state';

@Component({
  selector: 'app-bail-details-page',
  templateUrl: './bail-details-page.component.html',
  styleUrls: ['./bail-details-page.component.scss']
})
export class BailDetailsPageComponent implements OnInit {

  currentBail$: Observable<DataStateProcessing<BailModel>> = {} as Observable<DataStateProcessing<BailModel>>;
  
  constructor(
    private bailService: BailService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.currentBail$ = this.bailService.findById(id).pipe(
      map(response => {
        if (response.code === HttpStatusCode.Ok){
          return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
        }else {
          return {dataState: DataStateEnum.ERROR, message: response.message}
        }
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );
  }

}
