import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dharma-ui-button',
  templateUrl: './dharma-ui-button.component.html',
  styleUrls: ['./dharma-ui-button.component.scss']
})
export class DharmaUiButtonComponent implements OnInit {

  @Output() onClick: EventEmitter<void> = new EventEmitter();

  @Input() enable = true;
  @Input() type = 'submit';
  @Input() title = 'Salvar';
  @Input() class = 'sm';
  @Input() form: FormGroup;
  @Input() styles: any = {};

  constructor() { }

  ngOnInit() {
  }

}
