import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { formEvents } from 'dharma-ui-common';
import { UserStorage } from 'src/app/shared/services/user.storage';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  @Input() data: any = {};

  showCountdown = true;
  currentStep: any = {}
  workflowStepType: string = ''
  showCpfNotFound: boolean = false
  showGenericRedirect: boolean = false

  constructor(
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    formEvents.init(this);

    this.currentStep = this.userStorage.getCurrentStep();
    this.workflowStepType = this.currentStep.data.workflowStepType;

    switch (this.workflowStepType) {
      case 'NotFinishOnboardingSignup':
        return this.showCpfNotFound = true;
      default:
        return this.showGenericRedirect = true;
    }
  }

  redirect() {
    if (this.data && this.data.url)
      window.location.href = this.data.url;
    else
      window.location.href = environment.SITE_DOTZ;
  }
}
