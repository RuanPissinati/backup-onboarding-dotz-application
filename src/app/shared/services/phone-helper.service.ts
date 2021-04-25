import { Injectable } from '@angular/core';

export interface DeviceMapperPhone {
  country_code: number,
  type: number,
  area_code: number,
  number: number,
};

@Injectable({
  providedIn: 'root'
})
export class PhoneHelperService {

  constructor() { }

  getAreaCode(phone): number {
    if (phone.includes('(')) {
      return +`${ phone [1]}${ phone[2] }`;
    } else {
      return +`${ phone [0]}${ phone[1] }`;
    }
  }

  getNumber(phone): number {
    let number;
    if (phone.includes('(')) {
      number = phone.substring(4);
    } else {
      number = phone.substring(2);
    }
    number = number.replace('-','').trim();
    return +number;
  }

  generateDeviceMapperData(phone): DeviceMapperPhone {
    return {
      country_code: 55,
      type: 3,
      area_code: this.getAreaCode(phone),
      number: this.getNumber(phone),
    };
  }

}
