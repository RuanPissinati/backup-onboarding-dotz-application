import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss']
})
export class RecaptchaComponent implements OnInit {

  public key = environment.RECAPTCHA_SITEKEY;
  captchaEnabled = environment.RECAPTCHA_ENABLED;

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
    if (!this.captchaEnabled) {
      formEvents.send({ recaptcha: environment.RECAPTCHA_CODE_ESCAPE }, this);
    }
  }

  resolved(event) {
    formEvents.send({ recaptcha: event }, this);
  }

}
