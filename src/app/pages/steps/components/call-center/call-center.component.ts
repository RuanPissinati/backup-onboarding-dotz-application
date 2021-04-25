import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrls: ['./call-center.component.scss']
})
export class CallCenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

}
