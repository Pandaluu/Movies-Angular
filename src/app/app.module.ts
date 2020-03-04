import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UiModule } from './shared/ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SearchComponent } from './pages/home/search/search.component';

import { MovieComponent } from './pages/home/movie/movie.component';
import { TokenInterceptorService } from './core/service/token-interceptor.service';
import { AppConfig } from './core/init/app-config';

// Token LOCATION_INITIALIZED
import { LOCATION_INITIALIZED } from '@angular/common';

// Translate module
import { TranslateModule, TranslateLoader, TranslateService, TranslateParser } from '@ngx-translate/core';
import { TranslationService } from './core/service/translation.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateICUParser } from 'ngx-translate-parser-plural-select';
import { ElapsedTimePipe } from './shared/pipes/elapsed-time.pipe';

// Define a function that invoke TranslationService
export function translationInitializerFactory(
  translateService: TranslateService, // the one from @ngx-translate
  translationService: TranslationService, // the one of our own...will be instanciate
  injector: Injector // Injection service
) {
  return (): Promise<void> => {
    return translationService.init(translateService, injector);
  };
}

export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(
     http,
     './assets/i18n/',
     '.json'
   );
}

export function initializeApp(appConfig: AppConfig) {
  return (): Promise<any> => {
    return appConfig.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    MovieComponent,
    ElapsedTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UiModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppConfig,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfig], multi: true },
    {
      provide: APP_INITIALIZER, // Token Angular lors de l'initialisation de l'application
      useFactory: translationInitializerFactory, // Usine à utiliser...
      deps: [
        TranslateService,
        TranslationService,
        Injector
      ], // Dépendances du services lui-même
      multi: true // Sinon, les autres fournisseurs ne pourraient pas être chargés...
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
