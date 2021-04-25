import { ViewChild, ComponentFactoryResolver, ViewContainerRef, Type, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { InputConfirmCodePhoneComponent } from 'src/app/pages/steps/components/input-confirm-code-phone/input-confirm-code-phone.component';
import { InputConfirmCodeEmailComponent } from 'src/app/pages/steps/components/input-confirm-code-email/input-confirm-code-email.component';
import { CentralAtendimentoComponent } from 'src/app/pages/steps/components/central-atendimento/central-atendimento.component';
import { UserStorage } from '../services/user.storage';
import { LoginComponent } from 'src/app/pages/steps/components/login/login.component';
import { ComponentHandler } from './component-handler';
import { DocumentUploadComponent } from 'src/app/pages/steps/components/document-upload/document-upload.component';
import { SelfieUploadComponent } from 'src/app/pages/steps/components/document-upload/selfie-upload/selfie-upload.component';
import { ConfirmEmailComponent } from 'src/app/pages/steps/components/confirm-email/confirm-email.component';
import { ConfirmPhoneComponent } from 'src/app/pages/steps/components/confirm-phone/confirm-phone.component';
import { RandomQuestionsComponent } from 'src/app/pages/steps/components/random-questions/random-questions.component';
import { RegisterWithoutPasswordComponent } from 'src/app/pages/steps/components/register-without-password/register-without-password.component';
import { RegisterWithPasswordComponent } from 'src/app/pages/steps/components/register-with-password/register-with-password.component';
import { FinishedComponent } from 'src/app/pages/steps/components/finished/finished.component';
import { SignupService } from '../services/signup.service';
import { ErrorComponent } from 'src/app/pages/steps/components/error/error.component';
import { CodeModalService } from 'src/app/shared/services/codeModal.service';

export class ComponentItem {
   constructor(public component: Type<any>, public data: any) { }
}

export class StateControl extends ComponentHandler {

   @ViewChild('estadoAtual', { static: true, read: ViewContainerRef }) container;

   viewContainerRef: ViewContainerRef;
   componentRef: any;
   onFinishAsync: Observable<any>;

   constructor(
      public _componentFactoryResolver: ComponentFactoryResolver,
      public cdr: ChangeDetectorRef,
      public signupService: SignupService,
      public userStorage: UserStorage,
      public codeModalService: CodeModalService,
   ) {
      super();
   }

   nextStepAction(result) {
      const step = result;
      const componentRef: Type<any> = this.getComponent(step.data.workflowStepType);
      const data: any = this.getData(step);
      data.workflowStepType = step.data.workflowStepType;
      const componentItem = new ComponentItem(componentRef, data);
      this.clearView();
      this.loadComponent(componentItem.component, componentItem.data);

      if (step.data.workflowStepType == 'SMSToken') {
         this.codeModalService.showModal(true)
      }
      if (step.data.workflowStepType == 'ConfirmUserAddress' || step.data.workflowStepType == 'Finish') {
         this.codeModalService.hideHeaderSteps(true)
      }
      if (step.data.workflowStepType == 'HomeWallet') {
         window.location.href = 'https://mkt.dotz.com.br/contadotz/';
      }
   }

   ngOnDestroy() {
      this.clearView();
   }

   /**
   * Limpa o viewContainer
   */
   clearView(): void {
      this.container.clear();
   }

   /**
   * Cria instância com base em um componente, renderiza
   * na tela, e caso necessário, injeta dados na instância
   * para pegar os dados do componente basta acessar a variavel `componentRef`
   * @param {Type<any>} component
   * @param {any}       dataToInject
   * @returns {any}      instância do componente
   */
   loadComponent(component: Type<any>, dataToInject?: any) {
      try {
         this.clearView();
      } catch (err) { }
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
      this.componentRef = this.container.createComponent(componentFactory);

      if (dataToInject) {
         for (const key in dataToInject) {
            if (key) {
               this.componentRef.instance[key] = dataToInject[key];
            }
         }
      }
      (this.componentRef.instance).data = dataToInject;
      this.cdr.detectChanges();
   }


}
