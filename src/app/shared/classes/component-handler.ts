import { InputConfirmCodePhoneComponent } from 'src/app/pages/steps/components/input-confirm-code-phone/input-confirm-code-phone.component';
import { LoginComponent } from 'src/app/pages/steps/components/login/login.component';
import { Type } from '@angular/core';
import { ConfirmPhoneComponent } from 'src/app/pages/steps/components/confirm-phone/confirm-phone.component';
import { DocumentUploadComponent } from 'src/app/pages/steps/components/document-upload/document-upload.component';
import { RegisterWithPasswordComponent } from 'src/app/pages/steps/components/register-with-password/register-with-password.component';
import { RandomQuestionsComponent } from 'src/app/pages/steps/components/random-questions/random-questions.component';
import { FinishedComponent } from 'src/app/pages/steps/components/finished/finished.component';
import { TemporaryBlockComponent } from 'src/app/pages/steps/components/temporary-block/temporary-block.component';
import { RegisterWithoutPasswordComponent } from 'src/app/pages/steps/components/register-without-password/register-without-password.component';
import { AcceptAgreementsComponent } from 'src/app/pages/steps/components/accept-agreements/accept-agreements.component';
import { PendingAccountComponent } from 'src/app/pages/steps/components/pendingAccount/pendingAccount.component';
import { DeviceMapperLoadingComponent } from 'src/app/pages/steps/components/device-mapper-loading/device-mapper-loading.component';
import { AuthenticateLoginComponent } from 'src/app/pages/steps/components/authenticate-login/authenticate-login.component';
import { ErrorComponent } from 'src/app/pages/steps/components/error/error.component';
import { RegisterCnpjWithPasswordComponent } from 'src/app/pages/steps/components/register-cnpj-with-password/register-cnpj-with-password.component';
import { RegisterCnpjWithoutPasswordComponent } from 'src/app/pages/steps/components/register-cnpj-without-password/register-cnpj-without-password.component';
import { BlacklistComponent } from 'src/app/pages/steps/components/blacklist/blacklist.component';
import { UserUnderAgeComponent } from 'src/app/pages/steps/components/user-underage/user-underage.component';
import { FinishingRegisteredIdentifierComponent } from 'src/app/pages/steps/components/finishing-registered-identifier/finishing-registered-identifier.component';
import { CallCenterComponent } from 'src/app/pages/steps/components/call-center/call-center.component';
import { PreStepConfirmationComponent } from 'src/app/pages/steps/components/pre-step-confirmation/pre-step-confirmation.component';
import { ConfirmEmailComponent } from 'src/app/pages/steps/components/confirm-email/confirm-email.component';
import { InputConfirmCodeEmailComponent } from 'src/app/pages/steps/components/input-confirm-code-email/input-confirm-code-email.component';
import { ForgetPasswordComponent } from 'src/app/pages/steps/components/forget-password/forget-password.component';
import { InputPhoneEmailComponent } from 'src/app/pages/steps/components/input-phone-email/input-phone-email.component';
import { FinishedNewPasswordComponent } from 'src/app/pages/steps/components/finished-new-password/finished-new-password.component';
import { IdentifierAlreadyUsedV2Component } from 'src/app/pages/steps/components/identifier-already-used-v2/identifier-already-used-v2.component';
import { FinishedHelpDeskComponent } from 'src/app/pages/steps/components/finished-help-desk-ticket/finished-help-desk.component';
import { NewPasswordInputComponent } from 'src/app/pages/steps/components/new-password-input/new-password-input.component';
import { RedirectComponent } from 'src/app/pages/steps/components/redirect/redirect.component';
import { PasswordChangeSuccessComponent } from 'src/app/pages/steps/components/password-change-success/password-change-success.component';
import { InputEmailComponent } from 'src/app/pages/steps/components/input-email/input-email.component';
import { RecaptchaComponent } from 'src/app/pages/steps/components/recaptcha/recaptcha.component';
import { PendingTicketResolvedComponent } from 'src/app/pages/steps/components/pending-ticket-resolved/pending-ticket-resolved.component';
import { PhoneChangeSuccessComponent } from 'src/app/pages/steps/components/phone-change-success/phone-change-success.component';
import { InputConfirmCodeTransactionComponent } from 'src/app/pages/steps/components/input-confirm-code-transaction/input-confirm-code-transaction.component';
import { FinishedonboardingComponent } from 'src/app/pages/finishedonboarding/finishedonboarding.component';
export class ComponentHandler {

   getComponent(workflowStepType: string): Type<any> {
      switch (workflowStepType) {
         case 'PendingTicketResolve':
            return PendingTicketResolvedComponent;
         case 'PhoneChangeSuccess':
            return PhoneChangeSuccessComponent;
         case 'Recaptcha':
            return RecaptchaComponent;
         case 'PasswordChangeSuccess':
            return PasswordChangeSuccessComponent;
         case 'NewEmail':
            return InputEmailComponent;
         case 'CellPhoneAndEmail' || 'ConfirmCellPhone':
            return ConfirmPhoneComponent;
         case 'ForgetPassword':
            return ForgetPasswordComponent;
         case 'Redirect':
            return RedirectComponent;
         case 'DeviceMapper':
            return DeviceMapperLoadingComponent;
         case 'Pending':
            return PendingAccountComponent;
         case 'AcceptAgreements':
            return AcceptAgreementsComponent;
         case 'RequestPassword':
            return LoginComponent;
         case 'ConfirmEmail':
            return ConfirmEmailComponent;
         case 'InputConfirmCodeEmail':
            return InputConfirmCodeEmailComponent;
         case 'RandomQuestions':
            return RandomQuestionsComponent;
         case 'SMSToken':
            return ConfirmPhoneComponent;
         case 'TransactionToken':
            return InputConfirmCodeTransactionComponent;
         case 'RegisterFormWithPassword':
            return NewPasswordInputComponent;
         case 'RegisterFormWithoutPassword':
            return RegisterWithoutPasswordComponent;
         case 'RequestMotherName':
            return RegisterWithoutPasswordComponent;
         case 'RegisterFormCnpjWithPassword':
            return RegisterCnpjWithPasswordComponent;
         case 'RegisterFormCnpjWithoutPassword':
            return RegisterCnpjWithoutPasswordComponent;
         case 'DocumentUpload':
            return DocumentUploadComponent;
         case 'SelfieUpload':
            return DocumentUploadComponent;
         case 'TemporaryBlock':
            return TemporaryBlockComponent;
         case 'Finish':
            return FinishedonboardingComponent;
         case 'ConfirmUserAddress':
            return FinishedonboardingComponent;
         case 'HomeWallet':
            return FinishedonboardingComponent;
         case 'HelpDesk':
            return FinishedHelpDeskComponent;
         case 'SentNewPassword':
            return FinishedNewPasswordComponent;
         case 'Login':
            return AuthenticateLoginComponent;
         case 'BlackList':
            return BlacklistComponent
         case 'IdentifierAlreadyUsed':
            return BlacklistComponent;
         case 'IdentifierAlreadyUsedV2':
            return IdentifierAlreadyUsedV2Component;
         case 'UserHasUnderAge':
            return UserUnderAgeComponent;
         case 'FinishingRegisteredIdentifier':
            return FinishingRegisteredIdentifierComponent;
         case 'CallCenter':
            return CallCenterComponent;
         case 'PreStepConfirmation':
            return PreStepConfirmationComponent;
         case 'Password':
            return NewPasswordInputComponent;
         case 'NewPassword':
            return NewPasswordInputComponent;
         case 'NotFinishOnboardingSignup':
            return RedirectComponent;
         default:
            return ErrorComponent;
      }
   }

   getData(step) {
      try {
         return step.data && step.data.input ? JSON.parse(step.data.input) : {};
      } catch (err) {
         return step && step.data ? step.data : {};
      }
   }

}
