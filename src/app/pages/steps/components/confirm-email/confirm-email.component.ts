import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { formEvents } from 'dharma-ui-common';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  @Input() data: any = {};

  showChangeEmail: boolean = false;

  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    formEvents.init(this);
  }

  changeEmail() {
    this.showChangeEmail = true;
  }

  onSubmit(form: FormGroup) {
    this.formSubmitted = true;
    formEvents.submit(form, this);
  }

}
