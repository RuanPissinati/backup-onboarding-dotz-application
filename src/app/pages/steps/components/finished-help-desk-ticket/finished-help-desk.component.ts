import { Component, OnInit, Input } from '@angular/core';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { formEvents } from 'dharma-ui-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finished-help-desk',
  templateUrl: './finished-help-desk.component.html',
  styleUrls: ['./finished-help-desk.component.scss']
})
export class FinishedHelpDeskComponent implements OnInit {

  @Input() data: any = {};

  showCountdown = true;
  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

  redirectHelpDesk() {
    const helpDeskToken = this.data.token;
    window.location.href = `${ environment.HELPDESK_URL }/${ helpDeskToken }`;
  }
}
