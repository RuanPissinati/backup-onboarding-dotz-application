import { Component, OnInit, Input } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AnalyticsService, Geolocation } from 'src/app/shared/services/analytics.service';
import { LoaderService } from 'dharma-ui-components';
import { SignupService } from 'src/app/shared/services/signup.service';
import { TimeLineService } from 'src/app/shared/services/timeline.service';

@Component({
  selector: 'app-accept-agreements',
  templateUrl: './accept-agreements.component.html',
  styleUrls: ['./accept-agreements.component.scss']
})
export class AcceptAgreementsComponent implements OnInit {

  @Input() data: any = {};
  showTermsAndConditions: boolean = false
  contractSiteDotz: any = {};
  personalData: any = {};
  currentContract: any = {};


  form: FormGroup;
  contracts: any = [];

  constructor(
    private fb: FormBuilder,
    private analytics: AnalyticsService,
    private loaderService: LoaderService,
    private signupService: SignupService,
    private timeLineService: TimeLineService
  ) { }

  ngOnInit() {
    this.timeLineService.setTimeLineStep('AcceptAgreements');

    this.signupService.getUserIfos(localStorage.getItem("cpf")).subscribe((resp) => {
      this.personalData = resp.data;
      const maskBd = this.personalData.birthdate.slice(0, 10).split('-');
      this.personalData.birthdate = `${maskBd[2]}/${maskBd[1]}/${maskBd[0]}`
    });

    this.form = this.fb.group({
      accept1: [null, Validators.required],
    });

    formEvents.init(this);
  }
  clickLinkTerms(value) {
    this.currentContract = this.data[value].contentHtml;
    this.showTermsAndConditions = true;
  }

  onSubmit() {
    this.loaderService.show();

    const agreements = [];
    agreements.push(this.data[0].contractId);

    const platform = this.analytics.platform();
    const value: any = {
      agreements,
      platform: platform.osCode
    };

    formEvents.send(value, this);
  }

}
