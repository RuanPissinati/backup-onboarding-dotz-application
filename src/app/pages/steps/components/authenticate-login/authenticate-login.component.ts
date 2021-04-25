import { Component, OnInit } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { LoaderService } from 'dharma-ui-components';
import { environment } from 'src/environments/environment';
import { UserStorage } from 'src/app/shared/services/user.storage';

@Component({
  selector: 'app-authenticate-login',
  templateUrl: './authenticate-login.component.html',
  styleUrls: ['./authenticate-login.component.scss']
})
export class AuthenticateLoginComponent implements OnInit {
  [x: string]: any;
  listScopes: string;

  constructor(
    private loaderService: LoaderService,
    private userStorage: UserStorage
  ) { }

  ngOnInit() {
    formEvents.init(this);
    this.loaderService.show();

    this.listScopes = environment.LIST_SCOPES;

    const addScopes = this.userStorage.getAddScopes();

    if (addScopes) {
      this.listScopes += addScopes;
    }

    const data = {
      authorization: `${environment.SSO_CLIENT_ID_LP}:${environment.SSO_CLIENT_SECRET_LP}`,
      scopes: this.listScopes
    }
    formEvents.send(data, this);
  }

}
