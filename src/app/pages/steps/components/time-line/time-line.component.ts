import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimeLineService } from 'src/app/shared/services/timeline.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit, OnChanges {

  progress: number = null;
  showTimeLine: boolean = true;
  // @Input("estado-atual") estadoAtual: string;
  currentStep: string = "";

  timeLineSteps = [
    {
      id: 1,
      text: `Dados de Contato`,
      active: false,
      complete: false,
    },
    {
      id: 2,
      text: `Dados Pessoais`,
      active: false,
      complete: false,
    },
    {
      id: 3,
      text: `Senha`,
      active: false,
      complete: false,
    },
    {
      id: 4,
      text: `Concluído`,
      active: false,
      complete: false,
    }
  ];
  constructor(
    private timeLineService: TimeLineService
  ) { }
  ngOnInit() {
    this.timeLineService.timeLineCurretStep.subscribe(resp=>{
      console.log("RUAN", resp);
      this.setStep(resp);
    });
  }
  ngOnChanges() {
    // console.log(this.estadoAtual);
    // this.setStep(this.estadoAtual);
  }
  setStep(step) {
    let n = 0;
    switch(step){
      case'ConfirmCellPhone':
      case 'SMSToken':
        n = 1;
        break
      case 'RegisterFormWithoutPassword':
      case 'RequestMotherName':
        n = 2
        break
      case 'Password':
        n = 3
        break
      case 'AcceptAgreements':
        n = 4
        break
      default:
        n = 1;
        break
    }
    console.log(n);

    this.progress = n === 1 ?
      this.progress = 0 :
      100 / (this.timeLineSteps.length - 1) * (n - 1);

    for (const field in this.timeLineSteps) {
      if (this.timeLineSteps[field]['id'] == n) {
        this.timeLineSteps[field]['active'] = true;
      } else if (this.timeLineSteps[field]['id'] < n) {
        this.timeLineSteps[field]['active'] = false;
        this.timeLineSteps[field]['complete'] = true;
      } else {
        this.timeLineSteps[field]['complete'] = false;
        this.timeLineSteps[field]['active'] = false;
      }
    }
  }


}
