import { Routes, RouterModule } from '@angular/router';
import { StepsComponent } from './steps.component';

const routes: Routes = [
  {  
    path: '',
    component: StepsComponent,
  },
  {  
    path: ':cpf',
    component: StepsComponent,
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch: 'full'
  }
];

export const StepsRoutes = RouterModule.forChild(routes);
