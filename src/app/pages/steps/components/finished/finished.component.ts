import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { formEvents } from 'dharma-ui-common';
import { UserStorage } from 'src/app/shared/services/user.storage';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  @Input() data: any = {};

  showCountdown = true;
  constructor(
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    formEvents.init(this);
  }

  redirectSSO() {
    const urlAfterCallback = this.userStorage.getUrlAfterCallback();
    if (urlAfterCallback) {
      this.userStorage.clearUrlAfterCallback();
      window.location.href = `${urlAfterCallback}?ffac79874009f401f68532cf47633=${ this.data.access_token }`;      
    }
    else
    {
      const document = this.userStorage.getDocument();
      if (this.data && this.data.access_token && this.data.refresh_token) {
        window.location.href = `${ environment.SITE_DOTZ }/DynamicData.aspx?originurl=${ urlAfterCallback }&ffac79874009f401f68532cf47633=${ this.data.access_token }`
      } else {
        window.location.href = `${ environment.ACCOUNTS_SSO }`;
      }
    }
  }
}
