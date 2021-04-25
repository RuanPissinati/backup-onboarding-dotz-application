import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formEvents } from 'dharma-ui-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-identifier-already-used-v2',
  templateUrl: './identifier-already-used-v2.component.html',
  styleUrls: ['./identifier-already-used-v2.component.css']
})
export class IdentifierAlreadyUsedV2Component implements OnInit {
  showInputConfirmPhone: boolean = false;
  showChangePhone: boolean = false;
  form: FormGroup;

  constructor() { }

  showConfirmPhone(){
    this.showInputConfirmPhone = true;
  }

  ngOnInit() {
    formEvents.init(this);
  }

  onSubmit(value: any = {}) {
    formEvents.send(value, this);
  }

  isCorrect() {
    this.showChangePhone = false;
  }

}
