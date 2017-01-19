import * as console from 'console';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
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
export class QuizComponent implements OnInit, OnDestroy, AfterViewInit {
  stage = 0;
  currentQuiz: Quiz;
  givenQuizes: Quiz[];
  score = 100;
  answer = 0;
  ans = "";
  buttonDisabled = false;
  context:CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas: any;

  constructor(private quizService: QuizService, private router: Router) {}

  ngAfterViewInit() {
    // 参照をとれる
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.balloons(100);
  }

  ngOnInit(): void {
    this.getQuizes();
  }

  balloons(i: number): void {
    requestAnimationFrame(() => {
      for (let l = 0; l < i; l++) {
        var ctx = this.context;
        ctx.beginPath();
        var x: number = Math.random() * 500 + 100;
        var y: number = Math.random() * 500 + 100;
        ctx.arc(x, y, 35, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.fillStyle = this.colorGen();
        ctx.fill();
      }
      ctx.font = "bold 120px 'ＭＳ Ｐゴシック'";
      ctx.fillStyle = "black";
      ctx.fillText(`${i}`, 250, 350);
    });
  }

  clear() {
    var ctx = this.context;
    ctx.clearRect(0, 0, 1200, 800);
  }

  colorGen(){
    const colors = ['red', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length - 1) + 1];
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
    this.buttonDisabled = true;
    this.checkAnswer(userAnswer);
  }

  next(): void {
    this.buttonDisabled = false;
    if (this.stage === 5) {
      this.finish(this.score);
    } else {
      this.stage += 1;
      this.currentQuiz = this.givenQuizes[this.stage];
      this.ans = "";
    }
  }

  checkAnswer(userAnswer: number): void {
    const correctAnswer = this.currentQuiz.value;
    const diff = Math.abs(correctAnswer - userAnswer);
    this.displayAns(`${correctAnswer}`);

    this.score -= diff;
    this.clear();
    this.balloons(this.score)

    if (this.score <= 0) {
      this.finish(0);
    }
  }

  displayAns(ans: string): void {
    this.ans = ans;
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
