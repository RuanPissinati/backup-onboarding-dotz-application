import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import * as moment from 'moment';
import { SweetAlertService } from 'dharma-ui-alert';

@Component({
  selector: 'app-register-cnpj-without-password',
  templateUrl: './register-cnpj-without-password.component.html',
  styleUrls: ['./register-cnpj-without-password.component.scss']
})
export class RegisterCnpjWithoutPasswordComponent implements OnInit {
  @Input() data: any = {};

  inputMask: string = '00.000.000/0000-00';
  loginType: string = 'cnpj';
  form: FormGroup;
  formSubmitted: boolean = false;
  isPasswordConfirmed: boolean = false;
  showPasswordError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
    private sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit() {
    const cpf = this.userStorage.getDocument();

    const validateDate = (control) => {
      const value = control.value;
      if (moment(value, 'DD/MM/YYYY') >= moment()) {
        return { isValidDate: 'Data de nascimento não pode ser maior ou igual a data atual' }
      }
      return moment(value, 'DD/MM/YYYY').isValid() ? null : { isValidDate: 'Preencha uma data de nascimento válida' }
    };

    const momentOpeningDate = moment(this.data.openingDate, 'YYYY-MM-DD');
    this.data.openingDate = momentOpeningDate.isValid ? momentOpeningDate.format('DD/MM/YYYY') : this.data.openingDate;

    this.form = this.fb.group({
      identifier: [cpf, Validators.compose([ValidatorsUtil.required('CPF/CNPJ')])],
      fantasyName: [this.data.fantasyName],
      companyName: [this.data.companyName, Validators.compose([ValidatorsUtil.required('Razão Social')])],
      stateRegistration: [this.data.stateRegistration],
      webSite: [this.data.webSite],
      openingDate: [this.data.openingDate, Validators.compose([ValidatorsUtil.required('Data de Abertura'), ValidatorsUtil.minLength(10, 'data de nascimento'), validateDate])],
      email: [this.data.email, Validators.compose([ValidatorsUtil.isValidEmail('email')])],
    });

    this.form.get('identifier').valueChanges.subscribe(() => {
      this.returnMask();
    });

    formEvents.init(this);
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
    if (this.form.status === 'INVALID') { return; }
    const email = this.form.get('email').value;
    if (email) {
      this.sweetAlertService.show({
        title: 'Email de confirmação',
        text: 'Enviamos um email de confirmação, por favor verifique sua caixa de entrada e sua caixa de spam.'
      }).subscribe(() => {
        const value = this.form.value;
        const momentOpeningDate = moment(value.openingDate, 'DD/MM/YYYY');
        value.openingDate = momentOpeningDate.isValid ? momentOpeningDate.format('YYYY-MM-DD') : value.openingDate;
        formEvents.send(value, this);
      });
    } else {
      const value = this.form.value;
      const momentOpeningDate = moment(value.openingDate, 'DD/MM/YYYY');
      value.openingDate = momentOpeningDate.isValid ? momentOpeningDate.format('YYYY-MM-DD') : value.openingDate;
      formEvents.send(value, this);
    }
  }
}
