import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './routing.module';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';



import { DashboardComponent } from '../pages/dashboard/dashboard.component';

import { SubjectComponent } from '../pages/subject/subject.component';
import { ExamhomeComponent } from '../pages/examhome/examhome.component';
import { ResultsComponent } from '../pages/results/results.component';

import { SubjectformComponent } from '../component/subjectform/subjectform.component';

import { QuestionsComponent } from '../pages/questions/questions.component';

import { DataService } from '../services/data-service/data.service';

import { QuestionformComponent } from '../component/questionform/questionform.component';
import { ExampageComponent } from '../pages/exampage/exampage.component';
import { FinalComponent } from '../pages/final/final.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SubjectComponent,
    ExamhomeComponent,
    ResultsComponent,
    QuestionsComponent,
    SubjectformComponent,
    QuestionformComponent,
    ExampageComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    NgbModule
  ],
  providers: [ NgbActiveModal, DataService, MemberRoutingService ],
  entryComponents:[ SubjectformComponent, QuestionformComponent ],
  exports:[ SubjectComponent ]
})
export class QuizModule { }
