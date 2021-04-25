import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-user',
  templateUrl: './question-user.component.html',
  styleUrls: ['./question-user.component.css']
})
export class QuestionUserComponent implements OnInit {

  question = {
    query: 'Quais dessas lojas você realizou compras online no ultimo mês?',
    index: 1,
    answer: [
      'Ponto Frio',
      'Americanas.com',
      'Extra.com',
      'Amazon'
    ]
  }

  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  nextQuestion() {
    if(this.question.index === 2){
      this.question.query = 'Selecione a opção com o nome da sua mãe:*',
      this.question.answer = [
        'Rosângela',
        'Ivone',
        'Elisabeth',
        'Maria',
        'Marcia'
      ]
    }
    if(this.question.index === 3){
      this.router.navigate([`steps/`])
    }
    this.question.query = 'Qual foi o valor da sua última compra?*',
    this.question.answer = [
      'R$ 1.395,90',
      'R$ 932,00',
      'R$ 50,00',
      'R$ 2.598,00',
      'R$ 465,00'
    ]
    this.question.index++;
  }

}