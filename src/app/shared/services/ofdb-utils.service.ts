import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';
import { DeviceMapperService } from './device-mapper.service';
import { DeviceMapperScripts, LoadScriptsDynamically } from './load-scripts-dynamically';

declare var OFDB;

@Injectable({
  providedIn: 'root'
})
export class OfdbUtilsService {

  constructor(
    private deviceMapper: DeviceMapperService,
    private loadDynamicScripts: LoadScriptsDynamically
  ) {
    this.loadDynamicScripts.scripts = DeviceMapperScripts;
    DeviceMapperScripts.forEach((script: any) => {
      this.loadDynamicScripts.scripts[script.name] = {
        loaded: false,
        src: script.src,
      };
    });
  }

  ofdbInit(identifier: string, identifierType) {
    this.loadDynamicScripts.loadAllScripts().subscribe(() => {
      const client = environment.DEVICE_MAPPER_CLIENT;
      const copyAndPasteDetectionFields = ['id_email', 'id_password'];
      let ofdb;

      if (typeof (OFDB) !== 'undefined') {
        // passar session ID em SHA256
        const date = new Date().toISOString();
        const session = sha256(date);
        this.deviceMapper.save('session_id', session);
        ofdb = new OFDB(client, session, copyAndPasteDetectionFields);
      }
      const loginType: string = identifierType === 1 ? 'PJ' : 'PF'; // PF ou PJ
      const accountParams: any = {
        param1: identifier,
        param2: ' ',
        param3: ' ',
        f10Param: ' ',
      }; // User info 1 - cpf, passar o restante em branco 


      //Definição de uma função de callback em caso de sucesso
      var successCallback = function (data) {
        console.log('successCallback device mapper', data);
        console.log(data);
      };
      //Definição de uma função de callback em caso de erro
      var errorCallback = function (err) {
        console.log(err);
      }
      ofdb.f1(loginType, accountParams, successCallback, errorCallback); // envio de evento de login
      //ofdb.f2(accountParams, successCallback, errorCallback); //automacao de digitacao de pagina
    });
  }
}