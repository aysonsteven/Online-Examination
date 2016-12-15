import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './routing.module';

import { Member } from './philgo-api/v2/member';
import { Post } from './philgo-api/v2/post';
import { MemberRoutingService } from './services/user-routing/member-routing.service';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SubjectComponent } from './subject/subject.component';
import { ExamhomeComponent } from './examhome/examhome.component';
import { UsersComponent } from './users/users.component';
import { ResultsComponent } from './results/results.component';

import { SubjectformComponent } from './subjectform/subjectform.component';

import { QuestionsComponent } from './questions/questions.component';

import { DataService } from './services/data-service/data.service';
import { RegistrationComponent } from './registration/registration.component';
import { QuestionformComponent } from './questionform/questionform.component';
import { ExampageComponent } from './exampage/exampage.component';
import { FinalComponent } from './final/final.component';


@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    LoginComponent,
    DashboardComponent,
    SubjectComponent,
    ExamhomeComponent,
    UsersComponent,
    ResultsComponent,
    SubjectformComponent,
    QuestionsComponent,
    RegistrationComponent,
    QuestionformComponent,
    ExampageComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    NgbModule.forRoot()
  ],
  providers: [ Member, MemberRoutingService, NgbActiveModal, Post, DataService ],
  bootstrap: [AppComponent],
  entryComponents:[ SubjectformComponent, QuestionformComponent ]
})
export class AppModule { }
