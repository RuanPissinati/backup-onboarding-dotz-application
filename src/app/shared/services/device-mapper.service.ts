import { Injectable } from '@angular/core';
import { DeviceMapper } from '../models/device-mapper';

@Injectable({
  providedIn: 'root'
})
export class DeviceMapperService {

  constructor() { }

  get() {
    return JSON.parse(localStorage.getItem('deviceMapper'));
  }

  save(prefix: string, value): DeviceMapper {
    const data: DeviceMapper = JSON.parse(localStorage.getItem('deviceMapper')) || {};
    data[prefix] = value;
    localStorage.setItem('deviceMapper', JSON.stringify(data));
    return data;
  }

}
