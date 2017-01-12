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
  msg2 = "";
  buttonDisabled = false;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getQuizes();
  }

  ngOnDestroy(): void {
  }

  getQuizes(): void {
    this.quizService.getQuizes().then((quizes) => {
      this.givenQuizes = this.shuffle(quizes).slice(0, 5);
      this.currentQuiz = this.givenQuizes[0];
    });
  }

  submit(userAnswer: number): void {
    this.checkAnswer(userAnswer);
  }

  next(): void {
    if (this.stage === 5) {
      this.finish(this.score);
    } else {
      this.stage += 1;
      this.currentQuiz = this.givenQuizes[this.stage];
      this.msg = "";
    }
  }

  checkAnswer(userAnswer: number): void {
    const correctAnswer = this.currentQuiz.value;
    const diff = Math.abs(correctAnswer - userAnswer);
    if (diff === 0) {
      this.displayMsg('正解!');
    } else {
      this.displayMsg(`正解: ${correctAnswer}`);
      this.displayMsg2(`${diff} のバルーンを失いました!`);
      this.score -= diff;
      if (this.score <= 0) {
        this.finish(0);
      }
    }
  }

  displayMsg(msg: string): void {
    this.msg = msg;
  }

  displayMsg2(msg2: string): void {
    this.msg2 = msg2;
  }

  displayDiff(diff: string) {

}

  finish(finalScore: number): void {
    localStorage.setItem('score', String(finalScore));
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
