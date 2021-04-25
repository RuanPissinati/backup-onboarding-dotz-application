import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './shared/template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'steps',
        loadChildren: () => import('./pages/steps/steps.module').then(m => m.StepsModule),
      },
      {
        path: 'forget-password',
        loadChildren: () => import('./pages/steps/steps.module').then(m => m.StepsModule),
      },
      {
        path: 'forget-password-document',
        loadChildren: () => import('./pages/forget-password-document/forget-password-document.module').then(m => m.ForgetPasswordDocumentModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/cpf-identifier/cpf-identifier.module').then(m => m.CpfIdentifierModule),
      },
      {
        path: 'central-atendimento',
        loadChildren: () => import('./pages/central-atendimento/central-atendimento.module').then(m => m.CentralAtendimentoModule),
      },
      {
        path: 'secure-account-handler',
        loadChildren: () => import('./pages/secure-account-handler/secure-account-handler.module').then(m => m.SecureAccountHandlerModule),
      },
      {
        path: 'finishedonboarding',
        loadChildren: () => import('./pages/finishedonboarding/finishedonboarding.module').then(m => m.FinishedonboardingModule),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
