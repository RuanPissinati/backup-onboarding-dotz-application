import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SecureAccountHandlerRoutes } from './secure-account-handler.routing';
import { SecureAccountHandler } from './secure-account-handler.component';
import { LandingModule } from 'dharma-ui-common';
import { SignupService } from 'src/app/shared/services/signup.service';

@NgModule({
  declarations: [SecureAccountHandler],
  imports: [
    CommonModule,
    RouterModule.forChild(SecureAccountHandlerRoutes),
    LandingModule,
  ],
  providers: [SignupService],
  exports: [
    SecureAccountHandler,
  ],
})
export class SecureAccountHandlerModule { }
