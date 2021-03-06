import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatBadgeModule,
    BrowserModule,
    MatProgressBarModule,

  ],
  exports: [
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatBadgeModule,
    BrowserModule,
    MatProgressBarModule,
  ]
})
export class MaterialModule { }
