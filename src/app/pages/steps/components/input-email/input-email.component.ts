import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'dharma-ui-alert';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent implements OnInit {

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      email: [null, [ValidatorsUtil.isValidEmail(), Validators.required]],
    });

    formEvents.init(this);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.status === 'INVALID') { return; }
    formEvents.submit(this.form, this);
  }

  noEmail() {
    formEvents.send({email: ""}, this);
  }

}
