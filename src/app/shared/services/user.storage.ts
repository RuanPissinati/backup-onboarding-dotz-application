import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorage {

    saveCPF(cpf: string) {
        localStorage.setItem('cpf', cpf);
    }

    getDocument() {
        return localStorage.getItem('cpf');
    }

    saveFirstStepData(data) {
        localStorage.setItem('firstStepItem', JSON.stringify(data));
    }

    saveCurrentStep(step) {
        localStorage.setItem('currentStep', JSON.stringify(step));
    }

    saveCurrentDataStep(data: any ) {
        localStorage.setItem('currentStepData', JSON.stringify(data));
    }

    getCurrentDataStep() {
        return JSON.parse(localStorage.getItem('currentStepData'));
    }

    getCurrentStep() {
        return JSON.parse(localStorage.getItem('currentStep'));
    }

    getFirstStepData() {
        if (localStorage.getItem('currentStep')) {
            return JSON.parse(localStorage.getItem('currentStep'));
        }
        return JSON.parse(localStorage.getItem('firstStepItem'));
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    saveUrlAfterCallback(url: string) {
        localStorage.setItem('urlAfterCallback', url);
    }

    saveAddScopes(scopes: string){
        localStorage.setItem('addScopes', scopes);
    }

    getAddScopes(){
        let addScopes = localStorage.getItem('addScopes');
        if(addScopes)
            return localStorage.getItem('addScopes');
        else
            return "";            
    }

    getUrlAfterCallback() {
        let urlAfterCallback = localStorage.getItem('urlAfterCallback');
        if(urlAfterCallback)
            return localStorage.getItem('urlAfterCallback');
        else
            return "";
    }

    clearUrlAddScopes() {
        localStorage.removeItem('addScopes');
    }

    clearUrlAfterCallback() {
        localStorage.removeItem('urlAfterCallback');
    }

}
