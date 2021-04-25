import { Routes, RouterModule } from '@angular/router';
import { CpfIdentifierComponent } from './cpf-identifier.component';

const routes: Routes = [
  { 
     path: '',
     component: CpfIdentifierComponent,
  },
];

export const CpfIdentifierRoutes = RouterModule.forChild(routes);
