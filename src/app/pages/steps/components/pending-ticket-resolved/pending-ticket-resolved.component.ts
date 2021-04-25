import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-pending-ticket-resolved',
  templateUrl: './pending-ticket-resolved.component.html',
  styleUrls: ['./pending-ticket-resolved.component.scss']
})
export class PendingTicketResolvedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

}
