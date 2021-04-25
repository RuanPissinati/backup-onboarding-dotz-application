import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import * as moment from 'moment';
import { SweetAlertService } from 'dharma-ui-alert';
import ValidatorsFn from 'src/app/shared/services/validatorsFn';
import { SignupService } from 'src/app/shared/services/signup.service';
import { TimeLineService } from 'src/app/shared/services/timeline.service';

@Component({
  selector: 'app-register-without-password',
  templateUrl: './register-without-password.component.html',
  styleUrls: ['./register-without-password.component.scss']
})
export class RegisterWithoutPasswordComponent implements OnInit {

  @Input() data: any = {};

  inputMask: string = '000.000.000-000';
  loginType: string = 'cpf';
  form: FormGroup;
  formMotherName: FormGroup;
  formSubmitted: boolean = false;

  mothernamelist = [
    { value: null, key: "Selecione o nome da mãe", selected: true },
  ];
  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
    private sweetAlertService: SweetAlertService,
    private signupService: SignupService,
    private timeLineService: TimeLineService
  ) { }

  ngOnInit() {

    const cpf = this.userStorage.getDocument();
    this.timeLineService.setTimeLineStep('RegisterFormWithoutPassword');

    const momentBirthdate = moment(this.data.birthDate, 'YYYY-MM-DD');
    this.data.birthDate = momentBirthdate.isValid ? momentBirthdate.format('DD/MM/YYYY') : this.data.birthDate

    this.form = this.fb.group({
      identifier: [cpf, Validators.compose([ValidatorsUtil.required('CPF/CNPJ')])],
      birthDate: [this.data.birthDate, Validators.compose([ValidatorsFn.isDateMoreThan(16, 'data de nascimento'), ValidatorsUtil.required('data de nascimento'), ValidatorsUtil.minLength(8, 'data de nascimento'), ValidatorsFn.validateDate])],
      name: [this.data.name, Validators.compose([ValidatorsUtil.required('nome'), ValidatorsUtil.minLength(10, 'telefone')])],
    });

    this.formMotherName = this.fb.group({
      selected_mothername: [null, Validators.required],
    });

    if (this.isMothernameStep()) {

      // Popular campos nome e data de nascimento.
      this.signupService.getUserIfos(cpf).subscribe(({data})=>{

        const bday =  data.birthdate;
        const bdayArray = bday.slice(0, 10).split('-');

        this.form.patchValue({
          name: data.full_name,
          birthDate: `${bdayArray[2]}${bdayArray[1]}${bdayArray[0]}`
        });
      });

      // popular select nome da mãe
      for (let i in this.data.names.Data) {
        const element = this.data.names.Data[i];
        const elementSelect = {
          "value": element,
          "key": element,
          "selected": false
        };
        this.mothernamelist.push(elementSelect);
      }
    }
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

  isMothernameStep() {
    return this.data.workflowStepType === "RequestMotherName";
  }

  onSubmit() {
    if (this.isMothernameStep()) {
      const value = this.formMotherName.value;
      formEvents.send(value, this);

      return
    }
    const value = this.form.value;
    const momentBirthdate = moment(value.birthDate, 'DD/MM/YYYY');

    value.birthDate = momentBirthdate.isValid ? momentBirthdate.format('YYYY-MM-DD') : value.birthDate;
    this.formSubmitted = true;

    if (this.form.status === 'INVALID') {return}

    formEvents.send(value, this);
  }

}
