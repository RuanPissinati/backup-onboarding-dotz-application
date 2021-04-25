import { Injectable } from '@angular/core';
import { of, forkJoin, from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsDynamically {
  scripts: any = [];

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
      else {
        //load script
        let script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  loadAllScripts() {
    let result = [];
    this.scripts.forEach(script => {
      result.push(from(this.loadScript(script.name)));
    });
    return forkJoin(result);
  }
}

interface Scripts {
  name: string;
  src: string;
}

export const DeviceMapperScripts: Scripts[] = [
  { name: 'ofdb', src: environment.DEVICE_MAPPER_URL },
];