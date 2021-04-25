import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CodeModalService {

    modalStatus = new EventEmitter<boolean>();
    hideHeader = new EventEmitter<boolean>();
    messageError = new EventEmitter<boolean>();
    cellPhoneNumber = new EventEmitter<number>();
    cellPhoneNumberValidete = new EventEmitter<number>();
    verifiedCell = new EventEmitter<boolean>();

    constructor() { }
    showModal(status: boolean) {
        this.modalStatus.emit(status);
    }
    showMessageError(status: boolean) {
        this.messageError.emit(status);
    }

    hideHeaderSteps(status: boolean) {
        this.hideHeader.emit(status);
    }
}
