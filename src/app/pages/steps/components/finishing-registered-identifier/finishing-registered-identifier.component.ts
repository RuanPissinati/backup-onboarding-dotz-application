import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-finishing-registered-identifier',
  templateUrl: './finishing-registered-identifier.component.html',
  styleUrls: ['./finishing-registered-identifier.component.css']
})
export class FinishingRegisteredIdentifierComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
    
    const data = {};
    formEvents.send(data, this);
  }

}
