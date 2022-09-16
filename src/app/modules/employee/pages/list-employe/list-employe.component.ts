import { Component, OnInit } from '@angular/core';
import {EmployeModel} from "../../../../shared/models/entity/employe.model";
import {catchError, map, Observable, of, startWith, tap} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {NewEmployeeComponent} from "../../dialog/new-employee/new-employee.component";
import {HttpStatusCode} from "@angular/common/http";
import {EmployeeService} from "../../../../shared/services/services/employee.service";
import {DeleteEmployeeComponent} from "../../dialog/delete-employee/delete-employee.component";

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  employee$: Observable<DataStateProcessing<PageModel<EmployeModel>>> = {} as Observable<DataStateProcessing<PageModel<EmployeModel>>>;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  newEmployee() {
    const dialogRef = this.dialog.open(NewEmployeeComponent,{
      width: '600px',
      data: {
        edition: false
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  updateEmployee(employee: EmployeModel){
    const dialogRef = this.dialog.open(NewEmployeeComponent,{
      width: '600px',
      data: {
        edition: true,
        employee: employee
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteEmployee(employee: EmployeModel) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent,{
      width: '400px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.employee$ = this.employeeService.getAllEmployeePaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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
}
