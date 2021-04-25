import { Component, OnInit, Input } from '@angular/core';
import { formEvents, ValidatorsUtil } from 'dharma-ui-common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { tap } from 'rxjs/operators';
import { LoaderService } from 'dharma-ui-components';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
    private accountService: AccountsService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const document: string = this.userStorage.getDocument();
    this.form = this.fb.group({
      identifier: [null, Validators.compose([ValidatorsUtil.required('identificador')])],
    });
    formEvents.init(this);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.status === 'INVALID') { return; }
    const value = this.form.value;
    formEvents.send(value, this);
  }

  onSubmitNotRecognize() {
    var document = this.route.snapshot.paramMap.get('cpf');
    if (document.length > 11) { //TODO: Fluxo de CNPJ será tratado posteriormente de forma adequada.
      window.location.href = `${ environment.HELPDESK_URL }`;
    }
    else {
      formEvents.send({ identifier: 0}, this);
    }    
  }
}
