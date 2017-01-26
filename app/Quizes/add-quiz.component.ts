import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Quiz } from '../Quiz/Quiz'
import { QuizService } from '../Quiz/quiz.service'

import { DataService } from '../services/data.service';

@Component({
  moduleId: module.id,
  templateUrl: 'add-quiz.component.html',
  providers: [QuizService]
})

export class AddQuizComponent {
  quiz: any = {};
  quizes: any = [];

  addQuizForm: FormGroup;
  text = new FormControl('', Validators.required);
  value = new FormControl(0, Validators.required);

  constructor(
    private quizSercvice: QuizService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addQuizForm = this.formBuilder.group({
      text: this.text,
      value: this.value
    });
  }

  addQuiz() {
    this.dataService.addQuiz(this.addQuizForm.value).subscribe(
      res => {
        let newQuiz = res.json();
        this.quizes.push(newQuiz);
        this.addQuizForm.reset();
      },
      error => console.log(error)
    );
  }
}
