import { Component, Input, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-phone-change-success',
  templateUrl: './phone-change-success.component.html',
  styleUrls: ['./phone-change-success.component.scss']
})
export class PhoneChangeSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

  submit() {
    formEvents.send({ confirmed: true }, this);
  }

}
