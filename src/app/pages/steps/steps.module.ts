import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollHelperService } from 'src/app/shared/services/scroll-helper.service';
import { InputCpfComponent } from './components/input-cpf/input-cpf.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidatorModule } from 'dharma-ui-common';
import { LoaderModule, InputPasswordModule } from 'dharma-ui-components';
import { NgxMaskModule } from 'ngx-mask';
import { SignupNamePhoneComponent } from './components/signup-name-phone/signup-name-phone.component';
import { ConfirmPhoneComponent } from './components/confirm-phone/confirm-phone.component';
import { InputConfirmPhoneComponent } from './components/confirm-phone/input-confirm-phone/input-confirm-phone.component';
import { CountdownTimerModule } from 'dharma-ui-components';
import { InputConfirmCodePhoneComponent } from './components/input-confirm-code-phone/input-confirm-code-phone.component';
import { StepsComponent } from './steps.component';
import { StepsRoutes } from './steps.routing';
import { InputConfirmCodeEmailComponent } from './components/input-confirm-code-email/input-confirm-code-email.component';
import { InputConfirmEmailComponent } from './components/confirm-email/input-confirm-email/input-confirm-email.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { FileUploadModule } from 'dharma-ui-components';
import { SignupService } from 'src/app/shared/services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { PasswordKeyboardModule } from './components/login/password-keyboard/password-keyboard.module';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';
import { RouterModule } from '@angular/router';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { DocumentService } from 'src/app/shared/services/document.service';
import { SelfieUploadComponent } from './components/document-upload/selfie-upload/selfie-upload.component';
import { AlertModule, AlertSummaryModule } from 'dharma-ui-alert';
import { RgCnhUploadComponent } from './components/document-upload/rg-cnh-upload/rg-cnh-upload.component';
import { IsCorrectPhoneComponent } from './components/confirm-phone/is-correct-phone/is-correct-phone.component';
import { IsCorrectEmailComponent } from './components/confirm-email/is-correct-email/is-correct-email.component';
import { RandomQuestionsComponent } from './components/random-questions/random-questions.component';
import { RegisterWithoutPasswordComponent } from './components/register-without-password/register-without-password.component';
import { RegisterWithPasswordComponent } from './components/register-with-password/register-with-password.component';
import { FinishedComponent } from './components/finished/finished.component';
import { TemporaryBlockComponent } from './components/temporary-block/temporary-block.component';
import { AcceptAgreementsComponent } from './components/accept-agreements/accept-agreements.component';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { PendingAccountComponent } from './components/pendingAccount/pendingAccount.component';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { PhoneHelperService } from 'src/app/shared/services/phone-helper.service';
import { LoadScriptsDynamically } from 'src/app/shared/services/load-scripts-dynamically';
import { DeviceMapperLoadingComponent } from './components/device-mapper-loading/device-mapper-loading.component';
import { AuthenticateLoginComponent } from './components/authenticate-login/authenticate-login.component';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { ErrorComponent } from './components/error/error.component';
import { RegisterCnpjWithPasswordComponent } from './components/register-cnpj-with-password/register-cnpj-with-password.component';
import { RegisterCnpjWithoutPasswordComponent } from './components/register-cnpj-without-password/register-cnpj-without-password.component';
import { IdentifierAlreadyUsedComponent } from './components/identifier-already-used/identifier-already-used.component';
import { BlacklistComponent } from './components/blacklist/blacklist.component';
import { UserUnderAgeComponent } from './components/user-underage/user-underage.component';
import { FinishingRegisteredIdentifierComponent } from './components/finishing-registered-identifier/finishing-registered-identifier.component';
import { CallCenterComponent } from './components/call-center/call-center.component';
import { PreStepConfirmationComponent } from './components/pre-step-confirmation/pre-step-confirmation.component';
import { InputPhoneEmailComponent } from './components/input-phone-email/input-phone-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { FinishedNewPasswordComponent } from './components/finished-new-password/finished-new-password.component';
import { IdentifierAlreadyUsedV2Component } from './components/identifier-already-used-v2/identifier-already-used-v2.component';
import { FinishedHelpDeskComponent } from './components/finished-help-desk-ticket/finished-help-desk.component';
import { NewPasswordInputComponent } from './components/new-password-input/new-password-input.component';
import { DharmaUiInputModule } from 'src/app/shared/components/dharma-ui-input/dharma-ui-input.module';
import { DharmaUiButtonModule } from 'src/app/shared/components/dharma-ui-button/dharma-ui-button.module';
import { PasswordChangeSuccessComponent } from './components/password-change-success/password-change-success.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { InputEmailComponent } from './components/input-email/input-email.component';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { PendingTicketResolvedComponent } from './components/pending-ticket-resolved/pending-ticket-resolved.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { PhoneChangeSuccessComponent } from './components/phone-change-success/phone-change-success.component';
import { InputConfirmCodeTransactionComponent } from './components/input-confirm-code-transaction/input-confirm-code-transaction.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { TermsAndConditionsComponent } from './components/accept-agreements/terms-and-conditions/terms-and-conditions.component';
import ValidatorsFn from 'src/app/shared/services/validatorsFn';
// import { FinishedonboardingComponent } from 'src/app/pages/finishedonboarding/finishedonboarding.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ValidatorModule,
    NgxMaskModule,
    LoaderModule,
    FormsModule,
    CountdownTimerModule,
    StepsRoutes,
    FileUploadModule,
    RouterModule,
    PasswordKeyboardModule,
    AlertModule.forChild(),
    AlertSummaryModule,
    InputPasswordModule,
    DharmaUiInputModule,
    DharmaUiButtonModule,
    RecaptchaModule,
    MatStepperModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  providers: [
    ScrollHelperService,
    SignupService,
    RouteHelperService,
    DocumentService,
    AnalyticsService,
    PhoneHelperService,
    DeviceMapperService,
    LoadScriptsDynamically,
    AccountsService,
    ValidatorsFn
  ],
  entryComponents: [
    InputCpfComponent,
    SignupNamePhoneComponent,
    ConfirmPhoneComponent,
    ConfirmEmailComponent,
    InputConfirmPhoneComponent,
    InputConfirmEmailComponent,
    InputConfirmCodePhoneComponent,
    InputConfirmCodeEmailComponent,
    InputConfirmCodeTransactionComponent,
    LoginComponent,
    DocumentUploadComponent,
    SelfieUploadComponent,
    RgCnhUploadComponent,
    IsCorrectPhoneComponent,
    IsCorrectEmailComponent,
    RandomQuestionsComponent,
    RegisterWithoutPasswordComponent,
    RegisterWithPasswordComponent,
    FinishedComponent,
    TemporaryBlockComponent,
    UserUnderAgeComponent,
    AcceptAgreementsComponent,
    PendingAccountComponent,
    DeviceMapperLoadingComponent,
    AuthenticateLoginComponent,
    ErrorComponent,
    RegisterCnpjWithPasswordComponent,
    RegisterCnpjWithoutPasswordComponent,
    IdentifierAlreadyUsedComponent,
    IdentifierAlreadyUsedV2Component,
    BlacklistComponent,
    FinishingRegisteredIdentifierComponent,
    CallCenterComponent,
    PreStepConfirmationComponent,
    InputPhoneEmailComponent,
    ForgetPasswordComponent,
    RedirectComponent,
    FinishedNewPasswordComponent,
    FinishedHelpDeskComponent,
    NewPasswordInputComponent,
    PasswordChangeSuccessComponent,
    InputEmailComponent,
    RecaptchaComponent,
    PendingTicketResolvedComponent,
    PhoneChangeSuccessComponent,
    TermsAndConditionsComponent,
  ],
  declarations: [
    StepsComponent,
    InputCpfComponent,
    SignupNamePhoneComponent,
    SignupNamePhoneComponent,
    ConfirmPhoneComponent,
    ConfirmEmailComponent,
    InputConfirmPhoneComponent,
    InputConfirmEmailComponent,
    InputConfirmCodePhoneComponent,
    InputConfirmCodeEmailComponent,
    InputConfirmCodeTransactionComponent,
    LoginComponent,
    DocumentUploadComponent,
    SelfieUploadComponent,
    RgCnhUploadComponent,
    IsCorrectPhoneComponent,
    IsCorrectEmailComponent,
    RandomQuestionsComponent,
    RegisterWithoutPasswordComponent,
    RegisterWithPasswordComponent,
    FinishedComponent,
    TemporaryBlockComponent,
    UserUnderAgeComponent,
    AcceptAgreementsComponent,
    PendingAccountComponent,
    DeviceMapperLoadingComponent,
    AuthenticateLoginComponent,
    ErrorComponent,
    RegisterCnpjWithPasswordComponent,
    RegisterCnpjWithoutPasswordComponent,
    IdentifierAlreadyUsedComponent,
    IdentifierAlreadyUsedV2Component,
    BlacklistComponent,
    FinishingRegisteredIdentifierComponent,
    CallCenterComponent,
    PreStepConfirmationComponent,
    InputPhoneEmailComponent,
    ForgetPasswordComponent,
    RedirectComponent,
    FinishedNewPasswordComponent,
    FinishedHelpDeskComponent,
    NewPasswordInputComponent,
    PasswordChangeSuccessComponent,
    InputEmailComponent,
    RecaptchaComponent,
    PendingTicketResolvedComponent,
    PhoneChangeSuccessComponent,
    TermsAndConditionsComponent,
    TimeLineComponent,
  ],
})
export class StepsModule { }
