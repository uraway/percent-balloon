import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Http } from '@angular/http';
import { DataService } from '../services/data.service';

import { Quiz } from '../Quiz/Quiz'
import { QuizService } from '../Quiz/quiz.service'

@Component({
  moduleId: module.id,
  templateUrl: 'quizes.component.html',
  providers: [QuizService]
})

export class QuizesComponent implements OnInit {
  quizes: any = [];
  quiz: any = {};

  isLoading = true;
  isEditing = false;

  constructor(
    private quizSercvice: QuizService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.getQuizes();
  }

  getQuizes() {
    this.dataService.getQuizes().subscribe(
      data => this.quizes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(quiz: any) {
    this.isEditing = true;
    this.quiz = quiz;
  }

  cancelEditing() {
    this.isEditing = false;
    this.quiz = {};

    // reload the cats to reset the editing
    this.getQuizes();
  }

  editCat(quiz: any) {
    this.dataService.editQuiz(quiz).subscribe(
      res => {
        this.isEditing = false;
        this.quiz = quiz;
      },
      error => console.log(error)
    );
  }
}
