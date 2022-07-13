import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AppStore} from "./app-store";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private sanitizer: DomSanitizer,
    private appStore: AppStore
  ) { }

  getTheme(){
    const theme = this.appStore.getData()?.theme;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${theme}.css`)
  }
}
