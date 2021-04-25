import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingModule } from 'dharma-ui-common';
import { TemplateModule } from './template/template.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule, 
    LandingModule,
    TemplateModule,
    NgxMaskModule.forRoot(),
  ],
})
export class SharedModule { }
