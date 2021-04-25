import { Component, ComponentFactoryResolver, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'dharma-ui-components';
import { formEvents, getBasePath } from 'dharma-ui-common';
import { StateControl } from 'src/app/shared/classes/state-control';
import { SignupService } from 'src/app/shared/services/signup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { AlertSummaryService } from 'dharma-ui-alert';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';
import { OfdbUtilsService } from 'src/app/shared/services/ofdb-utils.service';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { switchMap } from 'rxjs/operators';
import { loadScripts } from 'src/app/shared/services/ofdb-utils';
import { CodeModalService } from 'src/app/shared/services/codeModal.service';


@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent extends StateControl implements OnInit, AfterViewInit, OnDestroy {

  onFinishAsync: Observable<any>;
  params: any = {};
  formListener;
  stepAsync: any;
  currentStep: any;
  isFinishedonboarding: boolean = false

  constructor(
    public _componentFactoryResolver: ComponentFactoryResolver,
    public cdr: ChangeDetectorRef,
    private loaderService: LoaderService,
    public signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router,
    public userStorage: UserStorage,
    private routeHelper: RouteHelperService,
    private alertSumaryService: AlertSummaryService,
    private ofdbUtilsService: OfdbUtilsService,
    private deviceMapper: DeviceMapperService,
    public codeModalService: CodeModalService,

  ) {
    super(_componentFactoryResolver, cdr, signupService, userStorage, codeModalService);
  }

  ngOnInit() {
    this.codeModalService.hideHeader.subscribe((status: boolean) => {
      this.isFinishedonboarding = status;
    });
  }

  ngAfterViewInit() {

    this.params = this.route.snapshot.params;

    const getWorkflowType = (identifier): number => {
      const url = this.router.url;
      let workflows = { cpf: 0, cnpj: 0 };

      if (url.indexOf('steps') !== -1) workflows = { cpf: 3, cnpj: 2 };
      else if (url.indexOf('forget-password') !== -1) workflows = { cpf: 6, cnpj: 7 };

      return identifier.length > 11 ? workflows.cnpj : workflows.cpf;
    };

    if (this.params && this.params.cpf) {
      this.userStorage.saveCPF(this.params.cpf);
    }
    else {
      this.routeHelper.reset();
      return;
    }

    const document = this.params.cpf || this.userStorage.getDocument();
    const data = {
      document,
      workflow_type: getWorkflowType(document),
      version: 1
    };
    this.userStorage.saveCurrentDataStep(data);
    this.loaderService.show();
    this.deviceMapper.save('account_scope', getWorkflowType);
    this.deviceMapper.save('user_info_1', document);
    this.deviceMapper.save('cpf', document);
    this.stepAsync = this.signupService.nextStep(data);
    this.stepAsync.subscribe(result => {
      this.ofdbUtilsService.ofdbInit(document, getWorkflowType);
      this.alertSumaryService.hide();
      const tokenReceive = result && result.data && result.data.token ? result.data.token : null;
      this.userStorage.saveToken(tokenReceive);
      this.userStorage.saveCurrentStep(result);
      this.nextStepAction(result);
      this.onFormSubmitListener();
      this.loaderService.hide();
    });


  }

  OnDestroy() {
    try {
      this.formListener.unsubscribe();
      this.stepAsync.unsubscribe();
    } catch (err) { }
  }

  /**
   * @description Quando o Child Component der submit no form principal
   */
  onFormSubmitListener() {
    this.loaderService.show();
    this.formListener = formEvents.onSubmit(this.componentRef);
    this.formListener.subscribe(value => {
      if (value) {
        this.nextStep(value);
      } else {
        this.loaderService.hide();
      }
    }, (err) => {
      this.loaderService.hide();
    });
    this.loaderService.hide();
  }

  /**
   * @description Essa função irá chamar o endpoint para prosseguir com o fluxo
   * Comportamento esperado: Ao concluir um step, o endpoint irá devolver qual o próximo step
   */
  nextStep(value?) {
    const token = this.userStorage.getToken();
    const data = {
      token,
      input: JSON.stringify(value),
      version: 1
    };

    this.userStorage.saveCurrentDataStep(data);
    this.loaderService.show();
    this.stepAsync = this.signupService.nextStep(data);
    this.stepAsync.subscribe(result => {

      this.alertSumaryService.hide();
      const tokenReceive = result && result.data && result.data.token ? result.data.token : null;
      this.userStorage.saveToken(tokenReceive);
      this.userStorage.saveCurrentStep(result);
      this.nextStepAction(result);
      this.loaderService.hide();
      this.onFormSubmitListener();
      this.OnDestroy();
    }, (err) => {
      this.loaderService.hide();
      console.log('err nextStep >>>>', err)
      this.codeModalService.showMessageError(true)
      // this.alertSumaryService.danger('Alerta', err.error, 150000);
    });
  }

}
