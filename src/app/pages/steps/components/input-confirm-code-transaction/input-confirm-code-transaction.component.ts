import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { CountdownTimerComponent, LoaderService } from 'dharma-ui-components';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import { AlertService, AlertSummaryService } from 'dharma-ui-alert';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-confirm-code-transaction',
  templateUrl: './input-confirm-code-transaction.component.html',
  styleUrls: ['./input-confirm-code-transaction.component.scss']
})
export class InputConfirmCodeTransactionComponent implements OnInit {

  @ViewChild(CountdownTimerComponent, { static: false }) countdownTimerComponent: CountdownTimerComponent;

  @Input() data: any = {};

  helpDeskUri: string = environment.HELPDESK_URL;

  form: FormGroup;
  formSubmitted = false;
  isExpired = false;

  constructor(
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private alertSumaryService: AlertSummaryService,
    private routeHelper: RouteHelperService,
    private deviceMapper: DeviceMapperService,
    private accountService: AccountsService,
  ) { }

  ngOnInit() {
    const transactionId = this.data.transaction_id;
    this.form = this.fb.group({
      transaction_id: null,
      code: [null, Validators.compose([ValidatorsUtil.required('código'), ValidatorsUtil.minLength(4, 'código'), ValidatorsUtil.isNumber('código')])],
    });
    this.form.get('transaction_id').setValue(transactionId);
    this.deviceMapper.save('transaction_id', transactionId);
    formEvents.init(this);
  }

  timeExpired() {
    this.isExpired = true;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.status === 'INVALID') { return; }

    formEvents.submit(this.form, this);
  }

  // resend() {
  //   this.countdownTimerComponent.startAgain();
  //   this.loaderService.show();
  //   this.formSubmitted = false;

  //   this.accountService.smsToken(this.data.transaction_id).subscribe(result => {
  //     this.alertService.success('Reenviamos o token no seu telefone!');
  //     this.loaderService.hide();
  //     this.isExpired = false;
  //   }, (err) => {
  //     this.loaderService.hide();
  //     this.alertSumaryService.danger('Alerta', err.error, 150000);
  //     this.alertService.danger('Ocorreu um erro, Tente novamente ou entre em contato com o suporte.');
  //   });
  // }

}
