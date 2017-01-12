import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Quiz } from '../Quiz/Quiz'
import { QuizService } from '../Quiz/quiz.service'

@Component({
  moduleId: module.id,
  templateUrl: 'quizes.component.html',
  providers: [QuizService]
})

export class QuizesComponent implements OnInit {
  quizes: Quiz[]
  selectedQuiz: Quiz

  constructor(
    private quizSercvice: QuizService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quizSercvice.getQuizes().then(quizes => this.quizes = quizes);
  }

  onSelect(quiz: Quiz): void {
    this.selectedQuiz = quiz;
    this.router.navigate(['/quiz-detail', this.selectedQuiz.id]);
  }
}
