import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
// Import modules from Material
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageListSelectComponent} from './image-list-select/image-list-select.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    ConfirmDialogComponent, ImageListSelectComponent
  ],
  exports: [
    CommonModule,
    OverlayModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageListSelectComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
