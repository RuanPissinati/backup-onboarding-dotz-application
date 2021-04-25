import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfIdentifierComponent } from './cpf-identifier.component';
import { CpfIdentifierRoutes } from './cpf-identifier.routing';
import { SignupService } from 'src/app/shared/services/signup.service';
import { CpfIdentifierFormModule } from './cpf-identifier-form/cpf-identifier-form.module';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'dharma-ui-components';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { LoadScriptsDynamically } from 'src/app/shared/services/load-scripts-dynamically';
import { AlertModule, AlertSummaryModule } from 'dharma-ui-alert';

@NgModule({
  imports: [
    CommonModule,
    CpfIdentifierRoutes,
    CpfIdentifierFormModule,
    AlertModule.forChild(),
    AlertSummaryModule,
    HttpClientModule,
    LoaderModule,
  ],
  providers: [SignupService, DeviceMapperService, LoadScriptsDynamically],
  declarations: [CpfIdentifierComponent]
})
export class CpfIdentifierModule { }
