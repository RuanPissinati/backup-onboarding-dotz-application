import { Component, Input, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-password-change-success',
  templateUrl: './password-change-success.component.html',
  styleUrls: ['./password-change-success.component.scss']
})
export class PasswordChangeSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

  submit() {
    formEvents.send({ confirmed: true }, this);
  }

}
