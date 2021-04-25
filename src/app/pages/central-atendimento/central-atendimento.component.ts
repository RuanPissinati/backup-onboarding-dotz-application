import { Component, OnInit } from '@angular/core';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';

@Component({
  selector: 'app-central-atendimento',
  templateUrl: './central-atendimento.component.html',
  styleUrls: ['./central-atendimento.component.scss']
})
export class CentralAtendimentoComponent {

  constructor(
    private routeHelper: RouteHelperService,
  ) {}

  back() {
    this.routeHelper.reset();
  }

}
