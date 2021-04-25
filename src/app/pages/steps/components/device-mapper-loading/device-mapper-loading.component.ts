import { Component, OnInit, Input } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { LoaderService } from 'dharma-ui-components';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-device-mapper-loading',
  templateUrl: './device-mapper-loading.component.html',
  styleUrls: ['./device-mapper-loading.component.scss']
})
export class DeviceMapperLoadingComponent implements OnInit {

  @Input() data: any = {};

  constructor(
    private loaderService: LoaderService,
    private deviceMapperService: DeviceMapperService,
  ) { }

  ngOnInit() {
    this.loaderService.show();
    formEvents.init(this);

    const deviceMapperData: any = this.deviceMapperService.get();
    const data = {
      session_id: deviceMapperData.session_id,
      phoneNumbers: deviceMapperData.phone_numbers,
      channel: environment.DEVICE_MAPPER_UI_CHANNEL
    }
    formEvents.send(data, this);
  }

}
