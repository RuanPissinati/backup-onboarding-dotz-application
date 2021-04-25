import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { ValidatorsUtil, formEvents } from 'dharma-ui-common';
import { DeviceMapperService } from 'src/app/shared/services/device-mapper.service';
import { PhoneHelperService, DeviceMapperPhone } from 'src/app/shared/services/phone-helper.service';
import { TimeLineService } from 'src/app/shared/services/timeline.service';



@Component({
  selector: 'app-input-confirm-phone',
  templateUrl: './input-confirm-phone.component.html',
  styleUrls: ['./input-confirm-phone.component.scss']
})
export class InputConfirmPhoneComponent implements OnInit {

  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() back: EventEmitter<any> = new EventEmitter();

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorage,
    private deviceMapper: DeviceMapperService,
    private phoneHelper: PhoneHelperService,
    private timeLineService: TimeLineService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      cellphone: [null, Validators.compose([ValidatorsUtil.required('telefone'), ValidatorsUtil.minLength(11, 'telefone')])],
      email: [null, Validators.email],
    });

    formEvents.init(this);
  }

  btnValidation() {
    return this.form.valid;
  }

  fieldValidation(campo: string) {
    return this.form.get(campo).touched && !this.form.get(campo).valid;
  }

  onSubmit() {
    const phone = this.form.get('cellphone').value;
    const email = this.form.get('email').value;
    let deviceMapperData: DeviceMapperPhone = this.phoneHelper.generateDeviceMapperData(phone);
    this.deviceMapper.save('phone_numbers', [deviceMapperData]);
    if (this.form.status === 'INVALID') { return; }
    this.submit.emit({ cellphone: phone, email });
  }

}
