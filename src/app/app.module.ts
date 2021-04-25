import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DharmaUiModule } from './dharma-ui/dharma-ui.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { getBasePath } from 'dharma-ui-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceMapperService } from './shared/services/device-mapper.service';
import { AnalyticsService } from './shared/services/analytics.service';
import { HttpClientModule } from '@angular/common/http';
import { CPFPipe } from './shared/pipes/cpf.pipe';
import { FinishedonboardingModule } from './pages/finishedonboarding/finishedonboarding.module';

const basePath = getBasePath('BASE_PATH_DIGITAL_ACCOUNT');

@NgModule({
  declarations: [
    AppComponent,
    CPFPipe,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DharmaUiModule,
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    FinishedonboardingModule
  ],
  providers: [
    DeviceMapperService,
    AnalyticsService,
    { provide: APP_BASE_HREF, useValue: basePath },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
