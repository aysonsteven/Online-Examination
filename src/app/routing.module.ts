import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamhomeComponent } from './examhome/examhome.component';
import { SubjectComponent } from './subject/subject.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';
import { ResultsComponent } from './results/results.component';
import { ExampageComponent } from './exampage/exampage.component';
import { FinalComponent } from './final/final.component';

const link: Routes = [
    { path: 'login', component : LoginComponent },
    { path: 'dashboard', component : DashboardComponent },
    { path: 'home', component : ExamhomeComponent },
    { path: 'dashboard/subjects', component: SubjectComponent },
    { path: 'dashboard/subjects/questions/:idx', component: QuestionsComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'users', component: UsersComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'exam', component: ExampageComponent },
    { path: 'final', component: FinalComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot( link ) ],
    exports: [ RouterModule ]
})

export class RoutesModule {}