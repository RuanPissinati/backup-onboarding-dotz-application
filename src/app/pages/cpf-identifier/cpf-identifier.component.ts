import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { LoaderService } from 'dharma-ui-components';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { tap } from 'rxjs/operators';
import { AlertSummaryService } from 'dharma-ui-alert';

declare var OFDB;

@Component({
  selector: 'app-cpf-identifier',
  templateUrl: './cpf-identifier.component.html',
  styleUrls: ['./cpf-identifier.component.scss']
})
export class CpfIdentifierComponent {

  queryParams: any = {};
  constructor(
    private signupService: SignupService,
    private router: Router,
    private route: ActivatedRoute,
    private userStorage: UserStorage,
    private loaderService: LoaderService,
    private alertSummaryService: AlertSummaryService,
    private deviceMapper: DeviceMapperService,
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
      return identifier.length > 11 ? 3 : 2;
    };
    const getWorkflowType = (identifier): number => {
      return identifier.length > 11 ? 2 : 3;
    };
    const identifier = form.get('identifier').value;
    localStorage.setItem('cpf', form.get('identifier').value);
    const identifierType = getIdentifierType(identifier);
    this.deviceMapper.save('account_scope', identifierType);
    this.deviceMapper.save('user_info_1', identifier);
    this.deviceMapper.save('cpf', identifier);
    const data: any = {
      document: identifier,
      // workflow_type: getWorkflowType(identifier),
      workflow_type: 3,
      version: 1
    };
    this.loaderService.show();
    this.signupService.nextStep(data).pipe(
      tap(result => this.userStorage.saveFirstStepData(result)),
      tap(result => this.userStorage.saveCurrentStep(result)),
      tap(result => this.userStorage.saveToken(result.data.token)),
      tap(result => this.userStorage.saveFirstStepData(result)),
    ).subscribe(() => {
      this.loaderService.hide();
      this.router.navigate([`steps/${identifier}`]);
    }, (err) => {
      console.log('err', err);
      this.loaderService.hide();
      this.alertSummaryService.warning('Alerta', err.error, 150000);
    });
  }

}
