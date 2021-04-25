import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { formEvents, ValidatorsUtil } from 'dharma-ui-common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';

@Component({
  selector: 'app-pre-step-confirmation',
  templateUrl: './pre-step-confirmation.component.html',
  styleUrls: ['./pre-step-confirmation.component.css']
})
export class PreStepConfirmationComponent implements OnInit {
  
  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({});
    formEvents.init(this);
  }


  onSubmit() {
    this.formSubmitted = true;
    formEvents.send(true, this);
  }

}
