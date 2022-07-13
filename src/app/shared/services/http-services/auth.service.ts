  import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{

  private url = 'auth/login';

  public authentication(loginData: any): Observable<ApiResponseModel<any>>{
    return this.post(this.url, loginData);
  }
}
