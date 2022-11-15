import { Component, OnInit } from '@angular/core';
import {DataStateEnum, DataStateProcessing} from "../../../shared/utils/data-processing-state";
import {UserModel} from "../../../shared/models/entity/user.model";
import {catchError, map, Observable, of, startWith, tap} from "rxjs";
import {PageModel} from "../../../shared/models/page-model";
import {UserService} from "../../../shared/services/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {NewUserComponent} from "../dialog/new-user/new-user.component";
import {EnableUserComponent} from "../dialog/enable-user/enable-user.component";
import {DeleteUserComponent} from "../dialog/delete-user/delete-user.component";
import {AppStore, LocalData} from "../../../shared/utils/app-store";
import {InitPassComponent} from "../dialog/init-pass/init-pass.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchValue = '';

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;

  users$: Observable<DataStateProcessing<PageModel<UserModel>>> = {} as Observable<DataStateProcessing<PageModel<UserModel>>>;

  localData: LocalData = {} as LocalData;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.loadData();
  }

  private loadData(queryParam?: any){
    this.users$ = this.userService.getAllUserPaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );
  }

  newUser(){
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      data: {
        edition: false,
        parameter: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.users$.pipe(
          tap(userList => {
            userList.data?.content.push(result);
          })
        );
      }
    });
  }

  enableUser(user: UserModel) {
    const dialogRef = this.dialog.open(EnableUserComponent, {
      width: '500px',
      data: user
    });
  }

  deleteUser(user: UserModel) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '500px',
      data: user
    });
  }

  initUser(user: UserModel) {
    const dialogRef = this.dialog.open(InitPassComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ngOnInit();
      }
    });
  }
}
