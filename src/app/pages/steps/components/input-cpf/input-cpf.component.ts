import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsUtil } from 'dharma-ui-common';
import { formEvents } from 'dharma-ui-common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-cpf',
  templateUrl: './input-cpf.component.html',
  styleUrls: ['./input-cpf.component.scss']
})
export class InputCpfComponent implements OnInit, AfterViewInit {
  
  inputMask: string = '000.000.000-000';
  loginType: string = 'cpf';
  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      identifier: [null, Validators.compose([ValidatorsUtil.required('CPF/CNPJ')])],
    });

    this.form.get('identifier').valueChanges.subscribe(() => {
      this.returnMask();
    });

    formEvents.init(this);
  }

  ngAfterViewInit() {
    this.returnMask();
  }

  returnMask() {
    try {
      const formControlValue = this.form.get('identifier').value;
      if (formControlValue.length > 11) {
        this.loginType = 'cnpj';
        this.inputMask = '00.000.000/0000-00';
      } else {
        this.loginType = 'cpf';
        this.inputMask = '000.000.000-000';
      }
    } catch(err) {
      this.loginType = 'cpf';
      this.inputMask = '000.000.000-000';
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    localStorage.setItem('cpf', this.form.get('identifier').value);
    formEvents.submit(this.form, this);
  }
}
