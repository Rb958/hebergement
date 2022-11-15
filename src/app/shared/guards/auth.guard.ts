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
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private appStore: AppStore,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appStore.getData().sessionExists){
      this.appStore.initialize('fr-FR');
      this.router.navigate(['/account/login']);
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appStore.getData().sessionExists){
      this.appStore.initialize('fr-FR');
      this.router.navigate(['/account/login']);
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appStore.getData().sessionExists){
      this.appStore.initialize('fr-FR');
      this.router.navigate(['/account/login']);
    }
    return true;
  }
}
