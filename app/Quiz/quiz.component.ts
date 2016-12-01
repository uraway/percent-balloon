import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { Quiz } from './Quiz';
import { QuizService } from '../Quiz/quiz.service';

@Component({
  moduleId: module.id,
  selector: 'my-quiz',
  templateUrl: 'quiz.component.html',
  providers: [QuizService]
})
export class QuizComponent implements OnInit, OnDestroy {
  stage = 0;
  currentQuiz: Quiz;
  givenQuizes: Quiz[];
  score = 100;
  answer = 0;
  msg = "";
  buttonDisabled = false;
  time = 20;

  constructor(private quizService: QuizService, private router: Router) {
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit(): void {
    this.getQuizes();
  }

  ngOnDestroy(): void {
  }

  tick(): void {
    this.time -= 1;
    if (this.time === 0) {
      this.next(0);
    }
  }

  getQuizes(): void {
    this.quizService.getQuizes().then((quizes) => {
      this.givenQuizes = this.shuffle(quizes).slice(0, 5);
      this.currentQuiz = this.givenQuizes[0];
    });
  }

  next(userAnswer: number): void {
    this.time = 20;
    if (this.stage === 5 || this.score <= 0) {
      this.finish();
    } else {
      this.checkAnswer(userAnswer);
      this.stage += 1;
      this.currentQuiz = this.givenQuizes[this.stage];
      this.msg = "";
    }
  }

  checkAnswer(userAnswer: number): void {
    const correctAnswer = this.currentQuiz.value;
    const diff = Math.abs(correctAnswer - userAnswer);
    if (diff === 0) {
      this.displayMsg('Correct!');
    } else {
      this.displayMsg(`
        Correct Answer is ${correctAnswer}
        Diff is ${diff}!
      `);
      this.score -= diff;
    }
  }

  displayMsg(msg: string): void {
    this.msg = msg;
  }

  finish(): void {
    this.router.navigate(['result']);
  }

  shuffle(array: Array<Quiz>): Array<Quiz> {
    let n = array.length;
    let t: any;
    let i: any;

    while(n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }

    return array;
  }
}
