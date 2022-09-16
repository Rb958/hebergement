import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AppStore} from "../utils/app-store";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private appStore: AppStore,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const localData = this.appStore.getData();
    if (localData.sessionExists && localData.keepSessionAlive){
      // if (this.appStore.getData().byAuth){
        return this.router.navigate(['/dashboard']);
     /* } else if (!this.appStore.getData().byAuth && this.appStore.getData().keepSessionAlive){
        return this.router.navigate(['/dashboard']);
      }else{
        return this.router.navigate(['/account']);
      }*/
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appStore.getData().sessionExists){
      return this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
