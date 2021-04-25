import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordKeyboardComponent } from './password-keyboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [PasswordKeyboardComponent],
  exports: [PasswordKeyboardComponent],
})
export class PasswordKeyboardModule { }
