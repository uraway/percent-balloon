import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { QUIZES } from './mock-quizes';

@Injectable()
export class QuizService {
  getQuizes(): Promise<Quiz[]> {
    return Promise.resolve(QUIZES);
  }
}
