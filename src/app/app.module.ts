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
import { CategoryComponent } from './category/category.component';
import { SubjectComponent } from './subject/subject.component';
import { ExamhomeComponent } from './examhome/examhome.component';
import { UsersComponent } from './users/users.component';
import { ResultsComponent } from './results/results.component';
import { CategoryformComponent } from './categoryform/categoryform.component';
import { SubjectformComponent } from './subjectform/subjectform.component';
import { CategoryparentComponent } from './categoryparent/categoryparent.component';
import { QuestionsComponent } from './questions/questions.component';

import { DataService } from './services/data-service/data.service';
import { RegistrationComponent } from './registration/registration.component'

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    SubjectComponent,
    ExamhomeComponent,
    UsersComponent,
    ResultsComponent,
    CategoryformComponent,
    SubjectformComponent,
    CategoryparentComponent,
    QuestionsComponent,
    RegistrationComponent
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
  entryComponents:[ CategoryComponent, SubjectformComponent, CategoryformComponent ]
})
export class AppModule { }
