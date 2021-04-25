import { Component } from '@angular/core';
import { DeviceMapperService } from './shared/services/device-mapper.service';
import { AnalyticsService } from './shared/services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SignupUIDefault';
  ip: string;
  currentURL: string;

  constructor(
    private deviceMapperService: DeviceMapperService,
    private analyticsService: AnalyticsService,
  ) {
    this.analyticsService.ip().subscribe((result: any) => {
      this.ip = result.ip;
      this.deviceMapperService.save('IP', this.ip);
      const currentURL = this.analyticsService.currentURL();
      this.deviceMapperService.save('referer', currentURL);
      this.deviceMapperService.save('return_scope', true);
      const userAgent = this.analyticsService.userAgent();
      this.deviceMapperService.save('user_agent', userAgent);
    });
  }
}
