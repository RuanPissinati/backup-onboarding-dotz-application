import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import { UserStorage } from 'src/app/shared/services/user.storage';

@Component({
  selector: 'app-signup-name-phone',
  templateUrl: './signup-name-phone.component.html',
  styleUrls: ['./signup-name-phone.component.scss']
})
export class SignupNamePhoneComponent implements OnInit {

  @Input() data: any = {};
  
  inputMask: string = '000.000.000-000';
  loginType: string = 'cpf';
  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    const cpf = this.userStorage.getDocument();

    this.form = this.fb.group({
      identifier: [cpf, Validators.compose([ValidatorsUtil.required('CPF/CNPJ')])],
      name: [null, Validators.compose([ValidatorsUtil.required('nome'), ValidatorsUtil.minLength(10, 'telefone')])],
      phone: [null, Validators.compose([ValidatorsUtil.required('telefone'), ValidatorsUtil.minLength(11, 'telefone')])],
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
    formEvents.submit(this.form, this);
  }

}
