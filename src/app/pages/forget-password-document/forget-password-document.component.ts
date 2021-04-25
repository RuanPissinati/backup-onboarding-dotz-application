import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { LoaderService } from 'dharma-ui-components';
import { AlertService, AlertSummaryService } from 'dharma-ui-alert';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';

declare var OFDB;

@Component({
  selector: 'app-forget-password-document',
  templateUrl: './forget-password-document.component.html',
  styleUrls: ['./forget-password-document.component.scss']
})
export class ForgetPasswordDocumentComponent {

  queryParams: any = {};
  constructor(
    private signupService: SignupService,
    private router: Router,
    private route: ActivatedRoute,
    private userStorage: UserStorage,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private alertSummaryService: AlertSummaryService,
    private deviceMapper: DeviceMapperService
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

  onSubmit(form: FormGroup) {
    /**
     * @description 1 Pessoa Jurídica, 2 - Pessoa Física.
     * @param identifier 
     */
    const getIdentifierType = (identifier): number => {
      return identifier.length > 11 ? 1 : 2;
    };
    const getWorkflowType = (identifier): number => {
      return identifier.length > 11 ? 2 : 1;
    };
    const identifier = form.get('identifier').value;
    localStorage.setItem('cpf', form.get('identifier').value);
    const identifierType = getIdentifierType(identifier);
    this.deviceMapper.save('account_scope', identifierType);
    this.deviceMapper.save('user_info_1', identifier);
    this.deviceMapper.save('cpf', identifier);
    const data: any = {
      document: identifier,
      workflow_type: getWorkflowType(identifier),
      version: 1
    };
    this.loaderService.show();
    this.signupService.nextStep(data).pipe(
      tap(result => this.userStorage.saveFirstStepData(result)),
      tap(result => this.userStorage.saveCurrentStep(result)),
      tap(result => this.userStorage.saveToken(result.data.token)),
      tap(result => this.userStorage.saveFirstStepData(result)),
    ).subscribe(() => {
      this.ofdbInit(identifier, identifierType);
      this.loaderService.hide();
      this.router.navigate([`forget-password/${identifier}`]);
    }, (err) => {
      console.log('err', err);
      this.loaderService.hide();
      this.alertSummaryService.warning('Alerta', err.error, 150000);
    });
  }

  ofdbInit(identifier: string, identifierType) {
    const client = environment.DEVICE_MAPPER_CLIENT;
    const copyAndPasteDetectionFields = ['id_email', 'id_password'];
    let ofdb;

    if (typeof (OFDB) !== 'undefined') {
      // passar session ID em SHA256
      const date = new Date().toISOString();
      const session = sha256(date);
      this.deviceMapper.save('session_id', session);
      ofdb = new OFDB(client, session, copyAndPasteDetectionFields);
    }
    const loginType: string = identifierType === 1 ? 'PJ' : 'PF'; // PF ou PJ
    const accountParams: any = {
      param1: identifier,
      param2: ' ',
      param3: ' ',
      f10Param: ' ',
    }; // User info 1 - cpf, passar o restante em branco 


    //Definição de uma função de callback em caso de sucesso
    var successCallback = function (data) {
      console.log('successCallback device mapper', data);
      console.log(data);
    };
    //Definição de uma função de callback em caso de erro
    var errorCallback = function (err) {
      console.log(err);
    }
    ofdb.f1(loginType, accountParams, successCallback, errorCallback); // envio de evento de login
    //ofdb.f2(accountParams, successCallback, errorCallback); //automacao de digitacao de pagina
  }

}
