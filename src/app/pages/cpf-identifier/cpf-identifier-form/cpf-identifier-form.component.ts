import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsUtil } from 'dharma-ui-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cpf-identifier-form',
  templateUrl: './cpf-identifier-form.component.html',
  styleUrls: ['./cpf-identifier-form.component.scss']
})
export class CpfIdentifierFormComponent implements OnInit {

  @Output() onFormSubmit: EventEmitter<FormGroup> = new EventEmitter();

  helpDeskUri: string = environment.HELPDESK_URL;
  inputMask: string = '000.000.000-000';
  loginType: string = 'cpf';
  form: FormGroup;
  formSubmitted: boolean = false;
  showComponent: boolean = false;
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

  clickRegister() {
    this.showComponent = !this.showComponent
  }

  btnValidation() {
    if (this.form.get('identifier').value == null || this.form.get('identifier').value == '')
      return false;
    return this.form.valid;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }

    this.onFormSubmit.emit(this.form);
  }

}
