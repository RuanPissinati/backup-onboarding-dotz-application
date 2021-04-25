import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralAtendimentoComponent } from './central-atendimento.component';
import { CentralAtendimentoRoutes } from './central-atendimento.routing';
import { RouteHelperService } from 'src/app/shared/services/route-helper.service';

@NgModule({
  imports: [
    CommonModule,
    CentralAtendimentoRoutes,
  ],
  providers: [RouteHelperService],
  declarations: [CentralAtendimentoComponent]
})
export class CentralAtendimentoModule { }
