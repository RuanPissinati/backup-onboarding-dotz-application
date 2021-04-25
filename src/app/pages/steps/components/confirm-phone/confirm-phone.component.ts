import { Component, OnInit, Input } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { TimeLineService } from 'src/app/shared/services/timeline.service';

@Component({
  selector: 'app-confirm-phone',
  templateUrl: './confirm-phone.component.html',
  styleUrls: ['./confirm-phone.component.scss']
})
export class ConfirmPhoneComponent implements OnInit {

  @Input() data: any = {};

  showChangePhone: boolean = false;

  constructor(
    private timeLineService: TimeLineService
  ) { }

  ngOnInit() {
    this.timeLineService.setTimeLineStep('CellPhoneAndEmail');

    if (this.data && !this.data.cellphone) {
      this.changePhone();
    }
    formEvents.init(this);
  }

  isCorrect() {
    this.showChangePhone = false;
  }

  changePhone() {
    this.showChangePhone = true;
  }

  onSubmit(value: any = {}) {
    formEvents.send(value, this);
  }

}
