import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-temporary-block',
  templateUrl: './temporary-block.component.html',
  styleUrls: ['./temporary-block.component.scss']
})
export class TemporaryBlockComponent implements OnInit {
  helpDeskUri: string = environment.HELPDESK_URL;
  constructor() { }

  ngOnInit() {
    formEvents.init(this);
  }

}
