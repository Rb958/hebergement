import { Component, OnInit } from '@angular/core';
import {EmployeModel} from "../../../../shared/models/entity/employe.model";
import {Observable} from "rxjs";
import {DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";

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

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  newEmployee() {

  }

  deleteEmployee(employee: EmployeModel) {

  }

  private loadData() {

  }
}
