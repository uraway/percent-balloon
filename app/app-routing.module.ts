import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './Dashboard/dashboard.component';
import { HomeComponent } from './Home/home.component';
import { QuizComponent } from './Quiz/quiz.component';
import { QuizesComponent } from './Quizes/quizes.component'
import { AddQuizComponent } from './Quizes/add-quiz.component';
import { QuizDetailComponent } from './QuizDetail/quiz-detail.component';
import { ResultComponent } from './Result/result.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quizes', component: QuizesComponent },
  { path: 'quizes/add', component: AddQuizComponent },
  { path: 'quiz-detail/:id', component: QuizDetailComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
