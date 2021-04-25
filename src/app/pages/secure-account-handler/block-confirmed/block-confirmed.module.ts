import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlockConfirmedRoutes } from './block-confirmed.routing';
import { BlockConfirmedComponent } from './block-confirmed.component';
import { SignupService } from 'src/app/shared/services/signup.service';
import { LoaderModule } from 'dharma-ui-components';
import { AlertModule } from 'dharma-ui-alert';
import { SuccessModule } from './success/success.module';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [BlockConfirmedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BlockConfirmedRoutes),
    LoaderModule,
    AlertModule,
    SuccessModule,
    ErrorModule
  ],
  providers: [SignupService],
  exports: [
    BlockConfirmedComponent
  ],
})
export class BlockConfirmedModule { }
