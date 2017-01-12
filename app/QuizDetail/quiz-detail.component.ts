import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Quiz } from '../Quiz/Quiz'
import { QuizService } from '../Quiz/quiz.service'

@Component({
  moduleId: module.id,
  templateUrl: 'quiz-detail.component.html',
  providers: [QuizService]
})

export class QuizDetailComponent implements OnInit {
  @Input() quiz: Quiz;

  constructor(
    private quizSercvice: QuizService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.quizSercvice.getQuiz(+params['id']))
      .subscribe(quiz => this.quiz = quiz)
  }

  goBack(): void {
    this.location.back();
  }
}
