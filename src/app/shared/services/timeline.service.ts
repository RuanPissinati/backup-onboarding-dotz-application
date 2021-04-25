import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeLineService {

    timeLineCurretStep = new EventEmitter<string>();

    constructor() { }
    setTimeLineStep(step: string) {
        localStorage.setItem("timeLineCurretStep", step.toString());
        this.timeLineCurretStep.emit(step);
    }


}
