import { Component, OnInit } from '@angular/core';

import { Quiz } from './Quiz';
import { QuizService } from '../Quiz/quiz.service';

@Component({
  moduleId: module.id,
  selector: 'my-quiz',
  templateUrl: 'quiz.component.html',
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  stage = 0;
  currentQuiz: Quiz;
  givenQuizes: Quiz[];
  score = 100;
  answer = 0;
  msg = "";

  constructor(private quizService: QuizService) { }

  getQuizes(): void {
    this.quizService.getQuizes().then((quizes) => {
      this.givenQuizes = this.shuffle(quizes).slice(0, 5);
      this.currentQuiz = this.givenQuizes[0];
    });
  }

  ngOnInit(): void {
    this.getQuizes();
  }

  next(userAnswer: number): void {
    if (this.stage === 5) {
      this.finish();
    } else {
      this.checkAnswer(userAnswer);

      setTimeout(() => {
        this.stage += 1;
        this.currentQuiz = this.givenQuizes[this.stage];
        this.msg = "";
      }, 1000 * 10);
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

  finish() {
    console.log('finish');
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
