import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finishedonboarding',
  templateUrl: './finishedonboarding.component.html',
  styleUrls: ['./finishedonboarding.component.css']
})
export class FinishedonboardingComponent implements OnInit {

  isMobile: boolean = false

  constructor() { }

  ngOnInit() {
    this.compareDevices()
  }

  openApp() {
    window.location.href = 'https://contadigitaldotz.com.br/vempracontadotz';
  }

  compareDevices() {
    let device = window.innerWidth;
    if (device <= 1366)
      this.isMobile = true;
  }

}
