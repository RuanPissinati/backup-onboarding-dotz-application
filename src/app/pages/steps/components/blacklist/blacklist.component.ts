import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent implements OnInit {
  helpDeskUri: string = environment.HELPDESK_URL;
  showInputConfirmPhone: boolean = false;
  showChangePhone: boolean = false;
  form: FormGroup;

  constructor() { }

  showConfirmPhone(){
    this.showInputConfirmPhone = true;
  }

  ngOnInit() {
    formEvents.init(this);
  }

  onSubmit(value: any = {}) {
    formEvents.send(value, this);
  }

  isCorrect() {
    this.showChangePhone = false;
  }

}
