import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordDocumentComponent } from './forget-password-document.component';

const routes: Routes = [
  { 
    path: '',
    component: ForgetPasswordDocumentComponent,
  },
];

export const ForgetPasswordDocumentRoutes = RouterModule.forChild(routes);
