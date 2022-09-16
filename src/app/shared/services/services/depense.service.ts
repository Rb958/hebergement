import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {EmployeModel} from "../../models/entity/employe.model";
import {DepenseModel} from "../../models/entity/depense.model";

@Injectable({
  providedIn: 'root'
})
export class DepenseService extends HttpService{
  url = 'api/depense';

  getAllDepensePaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<DepenseModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  create(depense: any) {
    return this.post(this.url, depense);
  }

  updateDepense(depense: any, id: number) {
    return this.put(`${this.url}/${id}`, depense);
  }

  deleteEmployee(depense: any) {
    return this.delete(`${this.url}/${depense.id}`);
  }

  validate(depense: DepenseModel) {
    return this.patch(`${this.url}/validate/${depense.id}`, depense)
  }
}
