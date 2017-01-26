import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './Dashboard/dashboard.component';
import { HomeComponent } from './Home/home.component';
import { QuizComponent } from './Quiz/quiz.component';
import { AddQuizComponent } from './Quizes/add-quiz.component';
import { QuizDetailComponent } from './QuizDetail/quiz-detail.component';
import { QuizesComponent } from './Quizes/quizes.component';
import { ResultComponent } from './Result/result.component';

import { AppRoutingModule }     from './app-routing.module';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    QuizComponent,
    QuizDetailComponent,
    QuizesComponent,
    AddQuizComponent,
    ResultComponent
  ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
