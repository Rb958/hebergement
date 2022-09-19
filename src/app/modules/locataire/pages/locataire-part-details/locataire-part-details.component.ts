import { DomSanitizer } from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {LocataireParticulierModel} from "../../../../shared/models/entity/locataire.model";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";
import { Env } from 'src/app/shared/utils/Env';

@Component({
  selector: 'app-locataire-part-details',
  templateUrl: './locataire-part-details.component.html',
  styleUrls: ['./locataire-part-details.component.scss']
})
export class LocatairePartDetailsComponent implements OnInit {
  locataireParticulier$: Observable<DataStateProcessing<LocataireParticulierModel>> = {} as Observable<DataStateProcessing<LocataireParticulierModel>>;

  constructor(
    private notifierService: NotifierService,
    private locataireService: LocataireService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.locataireParticulier$ = this.locataireService.findLocataireParticulierById(id).pipe(
      map(response => {
        if (response.code === HttpStatusCode.Ok.valueOf()){
          return {dataState: DataStateEnum.LOADED, message: 'success', data: response.result}
        }else{
          return {dataState: DataStateEnum.ERROR, message: response.message}
        }
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: 'Erreur lors de la recuperation des informations du locataire'}))
    );
  }

  getSanitizedUrl(ref?: string){
    const serverUrl = Env.getEnv().server;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${serverUrl}api/file/${ref}`)
  }

}
