import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, SecurityContext } from '@angular/core';
import {catchError, map, Observable, of, startWith, tap} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {LocataireParticulierModel} from "../../../../shared/models/entity/locataire.model";
import {MatDialog} from "@angular/material/dialog";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {HttpStatusCode} from "@angular/common/http";
import {EditLocataireParticulierComponent} from "../../dialog/edit-locataire-particulier/edit-locataire-particulier.component";
import {DeleteLocataireParticulierComponent} from "../../dialog/delete-locataire-particulier/delete-locataire-particulier.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-locataire-particulier',
  templateUrl: './list-locataire-particulier.component.html',
  styleUrls: ['./list-locataire-particulier.component.scss']
})
export class ListLocataireParticulierComponent implements OnInit {

  searchValue = '';

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;

  locataireParticulier$: Observable<DataStateProcessing<PageModel<LocataireParticulierModel>>> = {} as Observable<DataStateProcessing<PageModel<LocataireParticulierModel>>>;

  constructor(
    private dialog: MatDialog,
    private locataireService: LocataireService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  update(locataire: LocataireParticulierModel) {
    const dialogRef = this.dialog.open(EditLocataireParticulierComponent, {
      width: '600px',
      data : {
        edition: true,
        locataire: locataire
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.locataireParticulier$.pipe(
          tap(list => {
            const index = list.data?.content.indexOf(locataire);
            if (index!= undefined && index >= 0){
              list.data?.content.slice(index,1);
              list.data?.content.push(result);
            }
          })
        );
      }
    });
  }

  delete(locataire: LocataireParticulierModel) {
    const dialogRef = this.dialog.open(DeleteLocataireParticulierComponent, {
      width: '600px',
      data : {
        locataire: locataire
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.locataireParticulier$.pipe(
          tap(list => {
            const index = list.data?.content.indexOf(locataire);
            if (index!= undefined && index >= 0){
              list.data?.content.slice(index,1);
            }
          })
        );
      }
    });
  }

  getSanitizedUrl(url?: string){
    if (url){
      let urlCopie = url;
      if(!url.startsWith('http://') || !url.startsWith('https://')){
        urlCopie = 'https://' + url;
      }
      return this.sanitizer.sanitize(SecurityContext.URL, urlCopie);
    }else{
      return '';
    }
  }

  newLocataire() {
    const dialogRef = this.dialog.open(EditLocataireParticulierComponent, {
      width: '600px',
      data : {
        edition: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.loadData();
      }
    });
  }

  openDetails(particulier: LocataireParticulierModel){
    this.router.navigate(['../details/', particulier.id], {relativeTo: this.route});
  }

  private loadData(queryParam?: any){
    this.locataireParticulier$ = this.locataireService.getAllLocataireParticulierPagined(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
            return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
          }else {
            return {dataState: DataStateEnum.ERROR, message: response.message}
          }
        }
      ),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error}))
    );
  }
}
