import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';

@Component({
  selector: 'app-pendingAccount',
  templateUrl: './pendingAccount.component.html',
  styleUrls: ['./pendingAccount.component.scss']
})
export class PendingAccountComponent implements OnInit {

  showCountdown = true;
  constructor(
    private routeHelper: RouteHelperService,
  ) { }

  ngOnInit() {
    formEvents.init(this);
  }

  reset() {
    this.routeHelper.reset();
  }

}
