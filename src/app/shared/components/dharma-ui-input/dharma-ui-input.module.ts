import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DharmaUiInputComponent } from './dharma-ui-input.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgxMaskModule,
    ReactiveFormsModule,
  ],
  declarations: [DharmaUiInputComponent],
  exports: [DharmaUiInputComponent],
})
export class DharmaUiInputModule { }
