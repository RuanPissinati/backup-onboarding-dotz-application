import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dharma-password-keyboard',
  templateUrl: './password-keyboard.component.html',
  styleUrls: ['./password-keyboard.component.scss']
})
export class PasswordKeyboardComponent implements OnInit {

  @Input() virtualKeyboard: any = [];
  @Input() showPreview: boolean = true;
  @Input() control: FormControl;

  password: string = '';
  preview: any = [];

  constructor() { }

  ngOnInit() {
  }

  onClick(position: number) {
    if (this.password.length >= 6) { return; }
    this.preview.push('C');
    if (this.password) {
      this.password = `${ this.password }${ position.toString() }`;
    } else {
      this.password = position.toString();
    }
    this.control.setValue(this.password);
  }


  clean() {
    this.password = '';
    this.preview = [];
  }
}
