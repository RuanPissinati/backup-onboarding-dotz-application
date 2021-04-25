import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsUtil } from 'dharma-ui-common';

@Component({
  selector: 'app-is-correct-email',
  templateUrl: './is-correct-email.component.html',
  styleUrls: ['./is-correct-email.component.scss']
})
export class IsCorrectEmailComponent implements OnInit {

  @Output() changePhoneEvent: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  @Input() data: any = {};

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [this.data.email, Validators.compose([ValidatorsUtil.required('email'), ValidatorsUtil.minLength(11, 'email')])],
    });
  }

  changePhone() {
    this.changePhoneEvent.emit();
  }

  onSubmit() {
    this.submit.emit(this.form);
  }
}
