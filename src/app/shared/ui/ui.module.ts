import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [TopMenuComponent, FooterComponent, LanguageSwitcherComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    TopMenuComponent,
    FooterComponent,
    LanguageSwitcherComponent

  ]
})
export class UiModule { }
