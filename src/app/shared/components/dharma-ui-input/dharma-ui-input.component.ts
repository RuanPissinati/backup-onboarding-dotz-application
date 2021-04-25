import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dharma-ui-input',
  templateUrl: './dharma-ui-input.component.html',
  styleUrls: ['./dharma-ui-input.component.scss']
})
export class DharmaUiInputComponent implements OnInit {

  @Input() placeholder = 'Placeholder...';
  @Input() type = 'text';
  @Input() control: FormControl;
  @Input() inputMask = false;
  @Input() maxLength: number;

  
  constructor() { }

  ngOnInit() {
  }

}
