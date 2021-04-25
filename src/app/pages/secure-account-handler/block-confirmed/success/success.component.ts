import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  loginDotz = environment.ACCOUNTS_SSO;

  constructor() { }

  ngOnInit() {
  }

}
