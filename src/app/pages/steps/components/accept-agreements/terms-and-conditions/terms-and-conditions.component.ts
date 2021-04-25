import { Component, Input, OnInit , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  @Input('current-contract') currentContract = "";

  constructor(
    // private timeLineService: TimeLineService

  ) { }

  ngOnInit() {

  }
  back(){
    window.location.reload();
  }

  previousStep(step) {
    // this.timeLineService.setTimeLineStep(step);
  }

}
