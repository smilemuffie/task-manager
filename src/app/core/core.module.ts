import { NgModule, Optional, SkipSelf } from '@angular/core';
// Angular 升级之后 Http 变化
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadSvgSource } from '../utils/svgIcon';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
    ) {
    loadSvgSource(ir, ds);
  }
 }
