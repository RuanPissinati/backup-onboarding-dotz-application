import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { CountdownTimerComponent, LoaderService } from 'dharma-ui-components';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import { AlertService, AlertSummaryService } from 'dharma-ui-alert';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { environment } from 'src/environments/environment';
import { CodeModalService } from 'src/app/shared/services/codeModal.service';
import { SignupService } from 'src/app/shared/services/signup.service';
import { UserStorage } from 'src/app/shared/services/user.storage';




@Component({
  selector: 'app-input-confirm-code-phone',
  templateUrl: './input-confirm-code-phone.component.html',
  styleUrls: ['./input-confirm-code-phone.component.scss']
})
export class InputConfirmCodePhoneComponent implements OnInit {

  @ViewChild(CountdownTimerComponent, { static: false }) countdownTimerComponent: CountdownTimerComponent;

  @Input() data: any = {};
  @Output() submit: EventEmitter<any> = new EventEmitter();

  helpDeskUri: string = environment.HELPDESK_URL;

  form: FormGroup;
  formSubmitted = false;
  isExpired = false;
  completeCode: string[] = [];
  codeValid: boolean = false;
  $ = document.querySelector.bind(document);
  errorMensage: boolean = false;
  showModal: boolean = false;
  contentResendSmsToken: boolean = false;
  cellPhone = '';


  constructor(
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private alertSumaryService: AlertSummaryService,
    private routeHelper: RouteHelperService,
    private deviceMapper: DeviceMapperService,
    private accountService: AccountsService,
    private codeModalService: CodeModalService,
    public signupService: SignupService,
    public userStorage: UserStorage,


  ) { }

  ngOnInit() {
    const transactionId = this.data.transaction_id;
    this.form = this.fb.group({
      transaction_id: null,
      code: null,
    });
    this.form.get('transaction_id').setValue(transactionId);
    this.deviceMapper.save('transaction_id', transactionId);

    formEvents.init(this, this.form);

    this.codeModalService.modalStatus.subscribe((status: boolean) => {
      this.showModal = status;
    });
    this.codeModalService.messageError.subscribe((status: boolean) => {
      this.errorMensage = status;
    });
    this.cellPhone = this.data.cellphone;
  }

  timeExpired() {
    this.isExpired = true;
  }

  codeFormatValidate() {
    const code = this.completeCode.filter((element) => {
      return element === "" ? null : element;
    });
    this.codeValid = (code.length > 5);
  }

  changeInputCode(value, i) {
    this.errorMensage = false;
    this.completeCode[i - 1] = value;
    let code = this.completeCode.join().replace(/,/g, '').toString();
    this.form.get('code').setValue(code);
    this.deviceMapper.save('code', code);

    setTimeout(() => {
      this.codeFormatValidate();
      if (!(i > 5))
        this.$('#inputcode' + (i + 1)).focus();
    }, 30);
  }

  showContentResendSMSToken() {
    this.contentResendSmsToken = true
  }
  backSendCode() {
    this.contentResendSmsToken = false
  }
  resendSmsToken(key: string) {
    const transactionId = this.data.transaction_id;
    this.loaderService.show();
    this.formSubmitted = false;
    this.accountService.smsToken(transactionId, key).subscribe(result => {
      this.alertService.success('Reenviamos o token no seu telefone!');
      this.contentResendSmsToken = false;
      this.loaderService.hide();
      this.isExpired = false;
    }, (err) => {
      this.loaderService.hide();
      this.alertSumaryService.danger('Alerta', err.error, 150000);
      this.alertService.danger('Ocorreu um erro, Tente novamente ou entre em contato com o suporte.');
    });
  }

  closeModal() {
    this.completeCode.map((value, index) => {
      this.$("#inputcode" + (index + 1)).value = "";
    });
    const token = this.userStorage.getToken();
    const data = {
      token,
      input: "",
      version: 1
    };
    this.signupService.previousStep(data).subscribe(result => {
      this.userStorage.saveToken(result.data.token);
      this.userStorage.saveCurrentStep(result);
      this.loaderService.hide();
    }, (err) => {
      console.log('previousStep closeModal ERRO', err)
    });
    this.showModal = false;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.status === 'INVALID') { return; }
    this.submit.emit(this.form.value);
    // this.closeModal();
  }

}
