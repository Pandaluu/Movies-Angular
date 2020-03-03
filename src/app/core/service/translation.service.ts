import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { Observable } from 'rxjs';

/**
 * @name TranslationService
 * @author Aelion - March 2020
 * @version 1.0.1
 * Update to permit language selection
 */

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _language: string;
  private _translateService: TranslateService;

  constructor() { }

  public set language(language: string) {
    this._language = language;
    console.log(`How to switch to new ${this._language} ?`);
    this._switch();
  }

  public get language(): string {
    return this._language;
  }

   public init(
    translateService: TranslateService,
    injector: Injector
   ): Promise<void> {
     return new Promise<void>((resolve: any) => {
       // Get the LOCATION_INITIALIZER token
       injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
         // Promise taken...so...let's get the current language
         const navigatorLanguage: string = window.navigator.language;
         const userLanguage: string = navigatorLanguage.split('-')[0];

         // Check for userLanguage against our know languages and fallback to 'en' if no matching
         this._language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'en';

        // We can now load translations... using TranslateService param
         this._translateService = translateService;

         // We can now load translation...using TranslaService param
         this._switch()
          .subscribe(() => {
            console.log(`Translations loaded from ${this._language}`);
            resolve(null); // Promise must be taken
          });

       });
     });
  }

  private _switch(): Observable<any> {
    return this._translateService.use(this._language);
  }

}
