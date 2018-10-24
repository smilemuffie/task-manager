import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
