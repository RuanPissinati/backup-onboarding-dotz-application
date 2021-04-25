import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-underage',
  templateUrl: './user-underage.component.html',
  styleUrls: ['./user-underage.component.scss']
})
export class UserUnderAgeComponent implements OnInit {
  helpDeskUri: string = environment.HELPDESK_URL;
  
  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

}
