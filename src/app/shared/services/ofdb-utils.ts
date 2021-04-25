import { DeviceMapperScripts, LoadScriptsDynamically } from '../services/load-scripts-dynamically';
import { Observable } from 'rxjs';

export const loadScripts = (): Observable<any> =>
{
    const loadScriptsDynamically = new LoadScriptsDynamically();

    loadScriptsDynamically.scripts = DeviceMapperScripts;
    DeviceMapperScripts.forEach((script: any) => {
      loadScriptsDynamically.scripts[script.name] = {
        loaded: false,
        src: script.src,
      };
    });

    return loadScriptsDynamically.loadAllScripts();
}