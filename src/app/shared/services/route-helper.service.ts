import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserStorage } from './user.storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService {

  constructor(
    private userStorage: UserStorage,
    private router: Router,
  ) { }

  forgetPassword() {
    const document = this.userStorage.getDocument();
    window.location.href = `${ environment.ACCOUNTS_SSO }forget-password/${ document }`;
  }

  reset() {
    this.router.navigate(['home']);
  }

  centralAtendimento() {
    this.router.navigate(['central-atendimento']);
  }

  isCorrectStep(screenStep: string): boolean {
    const currentStepObject = this.userStorage.getCurrentStep();
    if (!currentStepObject) {
      window.location.href = '/';
      return false;
    }

    const currentStep: string = currentStepObject.data.workflowStepType;
    return currentStep === screenStep;
  }

}
