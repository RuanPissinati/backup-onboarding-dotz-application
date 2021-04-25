import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordDocumentComponent } from './forget-password-document.component';
import { ForgetPasswordDocumentRoutes } from './forget-password-document.routing';
import { CpfIdentifierFormModule } from './cpf-identifier-form/cpf-identifier-form.module';
import { AlertModule, AlertSummaryModule } from 'dharma-ui-alert';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'dharma-ui-components';
import { SignupService } from 'src/app/shared/services/signup.service';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { LoadScriptsDynamically } from 'src/app/shared/services/load-scripts-dynamically';

@NgModule({
  imports: [
    CommonModule,
    ForgetPasswordDocumentRoutes,
    CpfIdentifierFormModule,
    AlertModule.forChild(),
    AlertSummaryModule,
    HttpClientModule,
    LoaderModule,
  ],
  providers: [SignupService, DeviceMapperService, LoadScriptsDynamically],
  declarations: [ForgetPasswordDocumentComponent]
})
export class ForgetPasswordDocumentModule { }
