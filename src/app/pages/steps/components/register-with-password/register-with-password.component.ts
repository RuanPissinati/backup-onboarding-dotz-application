import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import * as moment from 'moment';
import { SweetAlertService } from 'dharma-ui-alert';

@Component({
  selector: 'app-register-with-password',
  templateUrl: './register-with-password.component.html',
  styleUrls: ['./register-with-password.component.scss']
})
export class RegisterWithPasswordComponent implements OnInit {

  @Input() data: any = {};

  inputMask: string = '000.000.000-000';
  loginType: string = 'cpf';
  form: FormGroup;
  formSubmitted: boolean = false;
  isPasswordConfirmed: boolean = false;
  showPasswordError: boolean = false;
  dateIsValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
    private sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit() {
    const cpf = this.userStorage.getDocument();

    const validateDate = (control) => {
      const value = control.value;
      if (moment(value, 'DD/MM/YYYY') >= moment()){
        return { isValidDate: 'Data de nascimento não pode ser maior ou igual a data atual' }
      }
      return moment(value, 'DD/MM/YYYY').isValid() ? null : { isValidDate: 'Preencha uma data de nascimento válida' }
    };

    const momentBirthdate = moment(this.data.birthDate, 'YYYY-MM-DD');
    this.data.birthDate = momentBirthdate.isValid ? momentBirthdate.format('DD/MM/YYYY') : this.data.birthDate;

    this.form = this.fb.group({
      identifier: [cpf, Validators.compose([ValidatorsUtil.required('CPF/CNPJ')])],
      birthDate: [this.data.birthDate, Validators.compose([ValidatorsUtil.minLength(8, 'data de nascimento'), validateDate])],
      email: [this.data.email, Validators.compose([ValidatorsUtil.isValidEmail('email')])],
      name: [this.data.name, Validators.compose([ValidatorsUtil.required('nome'), ValidatorsUtil.minLength(10, 'nome')])],
      password: [null, Validators.compose([ValidatorsUtil.isNumber('senha'), ValidatorsUtil.required('senha'), ValidatorsUtil.minLength(6, 'senha')])],
      repeatPassword: [null, Validators.compose([ValidatorsUtil.isNumber('senha'), ValidatorsUtil.required('senha'), ValidatorsUtil.minLength(6, 'senha')])],
    });

    this.form.get('identifier').valueChanges.subscribe(() => {
      this.returnMask();
    });

    this.form.get('repeatPassword').valueChanges.subscribe(confirmPassword => {
      if (!confirmPassword) {
        this.showPasswordError = false;
        return;
      }
      const password = this.form.get('password').value;
      if (password !== confirmPassword) {
        this.isPasswordConfirmed = false;
        this.showPasswordError = true;
      } else {
        this.isPasswordConfirmed = true;
        this.showPasswordError = false;
      }
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
    } catch (err) {
      this.loginType = 'cpf';
      this.inputMask = '000.000.000-000';
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.status === 'INVALID' || this.isPasswordConfirmed === false) { return; }
    const email = this.form.get('email').value;
    if (email) {
      this.sweetAlertService.show({
        title: 'Email de confirmação',
        text: 'Enviamos um email de confirmação, por favor verifique sua caixa de entrada e sua caixa de spam.'
      }).subscribe(() => {
        const value = this.form.value;
        const momentBirthdate = moment(value.birthDate, 'DD/MM/YYYY');
        value.birthDate = momentBirthdate.isValid ? momentBirthdate.format('YYYY-MM-DD') : value.birthDate;
        delete value.repeatPassword;
        delete value.identifier;
        formEvents.send(value, this);
      });
    } else {
      const value = this.form.value;
      const momentBirthdate = moment(value.birthDate, 'DD/MM/YYYY');
      value.birthDate = momentBirthdate.isValid ? momentBirthdate.format('YYYY-MM-DD') : value.birthDate;
      delete value.repeatPassword;
      delete value.identifier;
      formEvents.send(value, this);
    }
  }

}
