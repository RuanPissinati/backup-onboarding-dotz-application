import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { LandingModule } from 'dharma-ui-common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule, 
    LandingModule,
    RouterModule,
  ],
  exports: [TemplateComponent],
})
export class TemplateModule { }
