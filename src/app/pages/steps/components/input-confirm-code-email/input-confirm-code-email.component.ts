import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import { CountdownTimerComponent } from 'dharma-ui-components';

@Component({
  selector: 'app-input-confirm-code-email',
  templateUrl: './input-confirm-code-email.component.html',
  styleUrls: ['./input-confirm-code-email.component.scss']
})
export class InputConfirmCodeEmailComponent implements OnInit {

  @ViewChild(CountdownTimerComponent, { static: false }) countdownTimerComponent: CountdownTimerComponent;

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted: boolean = false;
  isExpired: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      code: [this.data.phone, Validators.compose([ValidatorsUtil.required('código'), ValidatorsUtil.minLength(4, 'código')])],
    });

    formEvents.init(this);
  }

  timeExpired() {
    this.isExpired = true;
  }

  onSubmit() {
    this.formSubmitted = true;
    formEvents.submit(this.form, this);
  }

  resend() {
    this.isExpired = false;
  }

}
