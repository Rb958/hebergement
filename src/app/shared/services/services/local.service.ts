import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {LocalModel} from "../../models/entity/local.model";

@Injectable({
  providedIn: 'root'
})
export class LocalService extends HttpService{

  getAllLocalPaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<LocalModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get("api/local/page-query/", queryParam);
  }

  save(data: any) {
    return this.post("api/local/", data);
  }

  deleteLocal(id: number) {
    return this.delete(`api/local/${id}`);
  }

  enableLocal(id: number, local: any) {
    return this.patch(`api/local/enable/${id}`, local);
  }

  findAllAvailabeLocals(currentPageIndex: number, currentPageElementSize: number, queryParam: any) {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = currentPageIndex;
    queryParam.size = currentPageElementSize;
    return this.get(`api/local/available`, queryParam);
  }
}
