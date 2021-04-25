import { Routes, RouterModule } from '@angular/router';
import { CentralAtendimentoComponent } from './central-atendimento.component';

const routes: Routes = [
  { 
    path: '',
    component: CentralAtendimentoComponent,
  },
];

export const CentralAtendimentoRoutes = RouterModule.forChild(routes);
