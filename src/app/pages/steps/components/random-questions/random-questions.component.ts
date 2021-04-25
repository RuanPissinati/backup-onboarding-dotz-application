import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { formEvents, ValidatorsUtil } from 'dharma-ui-common';

@Component({
  selector: 'app-random-questions',
  templateUrl: './random-questions.component.html',
  styleUrls: ['./random-questions.component.scss']
})
export class RandomQuestionsComponent implements OnInit {

  @ViewChild('stepper', { static: false }) private stepper: MatStepper;

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted = false;
  pageIndex = 0;
  shoWButton: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
    this.data.forEach(question => {
      this.addQuestion(question);
    });

    formEvents.init(this);
    // console.log('lastItem', this.lastItem())
  }

  addQuestion(questionObject) {
    const questions = this.form.get('questions') as FormArray;
    const questionGroup = this.fb.group({
      question: [questionObject.question],
      question_id: [questionObject.question_id],
      answer: [null, ValidatorsUtil.required('campo acima')],
      answers: this.fb.array([]),
    });
    questionObject.answers.forEach(answer => {
      const answersGroup = questionGroup.get('answers') as FormArray;
      answersGroup.push(new FormControl(answer));
    });
    questions.push(questionGroup);
  }

  onSelect() {
    this.stepper.next();
  }

  onPageChange(event) {
    let items = this.form.get('questions').value
    this.pageIndex = event.selectedIndex;

    if (this.pageIndex == items.length - 1) {
      return this.shoWButton = !this.shoWButton
    }
  }

  prev() {
    this.shoWButton = false
    this.stepper.previous();
  }

  onSubmit() {
    this.formSubmitted = true;
    const formGroup = this.form.get('questions');
    if (formGroup.status === 'INVALID') { return; }
    const value = formGroup.value.map(answerObject => {
      return {
        question_id: answerObject.question_id,
        answer: answerObject.answer,
      };
    });
    formEvents.send(value, this);
  }

}
