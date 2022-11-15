import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {ParameterModel} from "../../models/entity/parameter.model";
import {PageModel} from "../../models/page-model";
import {UserModel} from "../../models/entity/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  getAllUserPaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<UserModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get("api/user/page-query/", queryParam);
  }

  createUser(user: any): Observable<ApiResponseModel<UserModel>> {
    return this.post("api/user/", user);
  }

  updateUser(user: any, id: any): Observable<ApiResponseModel<UserModel>> {
    return this.put(`api/user/${id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponseModel<any>> {
    return this.delete(`api/user/${id}`);
  }

  getSingleUser(id: any): Observable<ApiResponseModel<UserModel>> {
    return this.get(`api/user/${id}`);
  }

  passwordUpdate(currentUser: UserModel, userId: number | undefined) {
    return this.patch(`api/user/${currentUser.id}/password`, currentUser);
  }

  enableUser(data: any, id: number): Observable<ApiResponseModel<UserModel>> {
    return this.patch(`api/user/enable/${id}`, data);
  }

  disableUser(data: any, id: number): Observable<ApiResponseModel<UserModel>> {
    return this.patch(`api/user/${id}`, data);
  }

  getAllUser() {
    return this.get(`api/user/`);
  }
}
