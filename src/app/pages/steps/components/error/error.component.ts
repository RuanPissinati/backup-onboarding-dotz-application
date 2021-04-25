import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

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
