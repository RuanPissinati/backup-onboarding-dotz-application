import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { LoaderService } from 'dharma-ui-components';
import { SweetAlertService } from 'dharma-ui-alert';
import { SignupService } from 'src/app/shared/services/signup.service';

/**
 * @author Gian Moraes
 * @description Página de bloqueio de segurança quando o cliente detecta atividade suspeita
 */

@Component({
  selector: 'block-confirmed',
  templateUrl: './block-confirmed.component.html',
  styleUrls: ['./block-confirmed.component.scss']
})
export class BlockConfirmedComponent implements OnInit {

  queryParams: any = {};
  success: boolean = null;

  constructor(
    private route: ActivatedRoute,
    private signupService: SignupService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams;
    this.loaderService.show();
    if (this.queryParams && this.queryParams.workflowUniqueId) {
      this.confirmBlock(this.queryParams.workflowUniqueId);
    }
    else
    {
      this.onError();
    }
  }

  /**
   * @description função que realiza o bloqueio temporário da conta
   */
  confirmBlock(workflowUniqueId: string) {
    this.signupService.blockUser(workflowUniqueId)
    .subscribe(() => {
      this.onSuccess();
    }, () => {
      this.onError();
    });
  }

  /**
   * @description * OnSuccess => irá mostrar a mensagem de sucesso
   */
  onSuccess()
  {
    this.loaderService.hide();
    this.success = true;
  }

  /**
   * @description * OnError => irá mostrar a mensagem de erro
   */
  onError() {
    this.loaderService.hide();
    this.success = false;
  }

}
