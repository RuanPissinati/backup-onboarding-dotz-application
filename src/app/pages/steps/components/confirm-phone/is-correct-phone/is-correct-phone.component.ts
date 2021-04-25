import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsUtil } from 'dharma-ui-common';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { PhoneHelperService, DeviceMapperPhone } from 'src/app/shared/services/phone-helper.service';
import { TimeLineService } from 'src/app/shared/services/timeline.service';

@Component({
  selector: 'app-is-correct-phone',
  templateUrl: './is-correct-phone.component.html',
  styleUrls: ['./is-correct-phone.component.scss']
})
export class IsCorrectPhoneComponent implements OnInit {

  @Output() changePhoneEvent: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() data: any = {};

  form: FormGroup;

  public customPatterns = { '0': { pattern: new RegExp('\[0-9•\]') } };

  constructor(
    private fb: FormBuilder,
    private deviceMapper: DeviceMapperService,
    private phoneHelper: PhoneHelperService,
  ) { }

  ngOnInit() {
    var maskedCellPhone = this.data.cellphone.substring(0, this.data.cellphone.length - 4).replace(/./g, "•") + this.data.cellphone.substring(this.data.cellphone.length - 4, this.data.cellphone.length);
    this.form = this.fb.group({
      cellphone: [maskedCellPhone, Validators.compose([ValidatorsUtil.required('telefone'), ValidatorsUtil.minLength(11, 'telefone')])],
    });
  }

  changePhone() {
    this.changePhoneEvent.emit();
  }

  onSubmit() {
    const phone = this.form.get('cellphone').value;
    let deviceMapperData: DeviceMapperPhone = this.phoneHelper.generateDeviceMapperData(phone);
    this.deviceMapper.save('phone_numbers', [deviceMapperData]);
    if (this.form.status === 'INVALID') { return; }
    this.submit.emit({ cellphone: this.data.cellphone });
  }

}
