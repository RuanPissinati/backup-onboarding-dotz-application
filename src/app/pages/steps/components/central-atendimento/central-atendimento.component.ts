import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-central-atendimento',
  templateUrl: './central-atendimento.component.html',
  styleUrls: ['./central-atendimento.component.scss']
})
export class CentralAtendimentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

}
