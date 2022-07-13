import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppStore, LocalData} from "../utils/app-store";

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  localData: LocalData;
  constructor(
    private appStore: AppStore
  ) {
    this.localData = this.appStore.getData();
    console.dir(this.localData);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("api interceptor");
    console.log("Token : " + this.localData.token);
    const reqClone = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + this.localData.token)
    });
    return next.handle(reqClone);
  }
}
