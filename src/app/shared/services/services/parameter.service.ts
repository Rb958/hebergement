import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {ParameterModel} from "../../models/entity/parameter.model";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class ParameterService extends HttpService{

  getAllPagined(pageIndex: number, pageSize: number, queryParam?: any) {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get("account/params/getall/", queryParam);
  }

  create(param: ParameterModel): Observable<ApiResponseModel<ParameterModel>> {
    return this.postEncrypted("account/params/create/", param);
  }

  update(param: ParameterModel): Observable<ApiResponseModel<ParameterModel>> {
    return this.postEncrypted("account/params/update/", param);
  }

}
