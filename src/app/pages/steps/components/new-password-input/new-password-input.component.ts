import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formEvents } from 'dharma-ui-common';
import { TimeLineService } from 'src/app/shared/services/timeline.service';

@Component({
  selector: 'app-new-password-input',
  templateUrl: './new-password-input.component.html',
  styleUrls: ['./new-password-input.component.scss'],
})
export class NewPasswordInputComponent implements OnInit {

  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Input() data: any = {};

  form: FormGroup;
  validateButton: boolean = false;
  verifiedCell: boolean = false;
  completeCode: string[] = ["", "", "", "", "", ""];
  $ = document.querySelector.bind(document);
  passwordvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private timeLineService: TimeLineService,
  ) { }

  ngOnInit() {
    this.timeLineService.setTimeLineStep('Password');

    this.form = this.fb.group({
      password: [null, Validators.required],
    });

    formEvents.init(this);
  }

  codeFormatValidate() {
    const code = this.completeCode.filter((element) => {
      return element === "" ? null : element;
    });
    this.passwordvalid = (code.length > 5);
  }

  changeInputCode(value, i) {
    this.completeCode[i - 1] = value;
    let password = this.completeCode.join().replace(/,/g, '').toString();
    this.form.get('password').setValue(password);

    setTimeout(() => {
      this.codeFormatValidate();
      if (!(i > 5))
        this.$('#input-password-' + (i + 1)).focus();
    }, 50);

  }

  onSubmit() {

    if (this.form.status === 'INVALID') { return }

    formEvents.submit(this.form, this);
  }

}
