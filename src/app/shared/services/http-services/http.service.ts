import {Injectable} from '@angular/core';
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {Encryption} from "../../utils/encryption";
import {Env} from "../../utils/Env";

@Injectable({
  providedIn: 'root'
})
export class HttpService{
  private apiServerUrl = Env.getEnv().server;

  constructor(
    protected http: HttpClient,
  ) { }

  protected post(url: string, data: any): Observable<ApiResponseModel<any>> {
    console.log(this.apiServerUrl + url);
    return this.http.post<ApiResponseModel<any>>(this.apiServerUrl + url, data);
  }

  protected put(url: string, data: any): Observable<ApiResponseModel<any>> {
    return this.http.put<ApiResponseModel<any>>(this.apiServerUrl + url, data);
  }

  protected delete(url: string): Observable<ApiResponseModel<any>> {
    return this.http.delete<ApiResponseModel<any>>(this.apiServerUrl + url);
  }

  protected patch(url: string, data: any): Observable<ApiResponseModel<any>> {
    return this.http.patch<ApiResponseModel<any>>(this.apiServerUrl + url, data);
  };

  protected get(url: string, data?: any): Observable<ApiResponseModel<any>> {
    return this.http.get<ApiResponseModel<any>>(this.apiServerUrl + url, {
      params: data
    });
  }

  protected postEncrypted(url: string, data: any): Observable<ApiResponseModel<any>> {
    const encryptedData = Object.create(null);
    encryptedData.data = Encryption.getInstance().encrypt(data);
    return this.http.post<ApiResponseModel<any>>(this.apiServerUrl + url, encryptedData).pipe(
      map(httpResponse => {
        if (httpResponse.code === HttpStatusCode.Ok){
          httpResponse.result = Encryption.getInstance().decrypt(httpResponse.result);
        }
        return httpResponse;
      })
    );
  }

  protected getEncrypted(url: string, data: any): Observable<ApiResponseModel<any>> {
    return this.http.get<ApiResponseModel<any>>(this.apiServerUrl + url,
      {
        params: {data: data}
      }
      ).pipe(
      map(httpResponse => {
        if (httpResponse.code === HttpStatusCode.Ok){
          httpResponse.result = Encryption.getInstance().decrypt(httpResponse.result);
        }
        return httpResponse;
      })
    );
  }
}
