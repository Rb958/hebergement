import { PsCommonModule } from './shared/components/ps-common/ps-common.module';
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/common/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NotifierModule} from "./shared/components/notification/notifier.module";
import {LayoutModule} from "./shared/components/layout/layout.module";
import {AccountModule} from "./modules/account/account.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalRequestInterceptor} from "./shared/interceptor/global-request.interceptor";
import {ApiRequestInterceptor} from "./shared/interceptor/api-request.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: HttpLoaderFactory
      }
    }),
    TranslateModule,
    LayoutModule,
    PsCommonModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: HTTP_INTERCEPTORS, useClass: GlobalRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
