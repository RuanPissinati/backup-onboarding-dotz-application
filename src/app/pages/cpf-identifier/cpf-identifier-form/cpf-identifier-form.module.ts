import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ValidatorModule } from 'dharma-ui-common';
import { ReactiveFormsModule } from '@angular/forms';
import { CpfIdentifierFormComponent } from './cpf-identifier-form.component';

@NgModule({
  imports: [
    CommonModule,
    NgxMaskModule,
    ValidatorModule,
    ReactiveFormsModule,
  ],
  declarations: [CpfIdentifierFormComponent],
  exports: [CpfIdentifierFormComponent],
})
export class CpfIdentifierFormModule { }
