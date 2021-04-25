import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { ValidatorsUtil } from 'dharma-ui-common';

@Component({
  selector: 'app-input-confirm-email',
  templateUrl: './input-confirm-email.component.html',
  styleUrls: ['./input-confirm-email.component.scss']
})
export class InputConfirmEmailComponent implements OnInit {

  @Output() submit: EventEmitter<any> = new EventEmitter();

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [this.data.phone, Validators.compose([ValidatorsUtil.required('telefone'), ValidatorsUtil.minLength(6, 'email')])],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.submit.emit(this.form);
  }

}
