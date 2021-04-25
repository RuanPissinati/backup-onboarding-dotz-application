import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'dharma-ui-alert';
import { formEvents, ValidatorsUtil } from 'dharma-ui-common';

@Component({
  selector: 'app-input-phone-email',
  templateUrl: './input-phone-email.component.html',
  styleUrls: ['./input-phone-email.component.scss']
})
export class InputPhoneEmailComponent implements OnInit {

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      cellphone: [this.data.cellphone, Validators.compose([ValidatorsUtil.required('telefone')])],
      email: [this.data.email, ValidatorsUtil.isValidEmail],
    });

    formEvents.init(this);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.status === 'INVALID') { return; }
    const value = this.form.value;
    formEvents.send(value, this);
  }

}
