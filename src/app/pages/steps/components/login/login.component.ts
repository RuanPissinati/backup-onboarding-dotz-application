import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import { PasswordKeyboardComponent } from './password-keyboard/password-keyboard.component';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { UserStorage } from 'src/app/shared/services/user.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(PasswordKeyboardComponent, { static: false }) passwordKeyboardComponent: PasswordKeyboardComponent;

  @Input() data: any = {};

  form: FormGroup;
  dateType: string;
  queryParams: any = {};
  constructor(
    private fb: FormBuilder,
    private routeHelper: RouteHelperService,
    private route: ActivatedRoute,
    private userStorage: UserStorage,
  ) {
    this.queryParams = this.route.snapshot.queryParams;
    if (this.queryParams && this.queryParams.urlAfterCallback) {
      this.userStorage.saveUrlAfterCallback(this.queryParams.urlAfterCallback);
    } else {
      this.userStorage.clearUrlAfterCallback();
    }

    if (this.queryParams && this.queryParams.addScopes) {
      this.userStorage.saveAddScopes(this.queryParams.addScopes);
    } else {
      this.userStorage.clearUrlAddScopes();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(4), ValidatorsUtil.isNumber('Senha')])],
      birthdate_part: [null, Validators.compose([Validators.required, ValidatorsUtil.minLength(2)])],
      authorization: [`${environment.SSO_CLIENT_ID_LP}:${environment.SSO_CLIENT_SECRET_LP}`],
    });
    formEvents.init(this, this.form);
    this.dateType = this.setDateType();
  }

  forgetPasswowrd() {
    this.routeHelper.forgetPassword();
  }

  reset() {
    this.routeHelper.reset();
  }

  setDateType() {
    switch (this.data.dateValidation) {
      case 0:
        return 'DIA';
      case 1:
        return 'Mês';
      case 2:
        return 'ANO ( Os dois últimos )';
    }
  }

  clean() {
    this.form.get('password').setValue(null);
  }

  onSubmit() {
    formEvents.submit(this.form, this);
  }
}
