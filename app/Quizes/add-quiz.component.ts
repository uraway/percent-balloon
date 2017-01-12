import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Quiz } from '../Quiz/Quiz'
import { QuizService } from '../Quiz/quiz.service'

@Component({
  moduleId: module.id,
  templateUrl: 'add-quiz.component.html',
  providers: [QuizService]
})

export class AddQuizComponent {
  text: '';
  answer: 0;

  constructor(
    private quizSercvice: QuizService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.text = "";
    this.answer = 0;
  }
}
