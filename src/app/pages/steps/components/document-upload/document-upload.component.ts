import { Component, OnInit, Input } from '@angular/core';
import { formEvents } from 'dharma-ui-common';
import { UserStorage } from 'src/app/shared/services/user.storage';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  question = {
    query: 'Que tipo de documento você irá enviar?',
    index: 1,
    answer: [
      'RG',
      'CNH',
      'RNE',
    ]
  }

  @Input() data: any = {};

  step = 'document';

  stepData: any = {};
  type: string = 'RG | CNH';
  showQuestions: boolean = true;

  constructor(
    private userStorage: UserStorage,
  ) { }

  ngOnInit() {
    formEvents.init(this);
  }

  onSelect(event) {
    let type = event.target.id
    this.type = type
    this.showQuestions = false
  }
  prev() {
    this.showQuestions = true;
    this.type = 'RG | CNH';
  }

  documentSubmit(data) {
    this.step = 'selfie';
    this.stepData.image = data;
  }

  selfieSubmit(data) {
    const cpf = this.userStorage.getDocument()
    this.stepData.cpf = cpf;
    this.stepData.face = data;
    formEvents.send(this.stepData, this);
  }

}
