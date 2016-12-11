import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamhomeComponent } from './examhome/examhome.component';
import { SubjectComponent } from './subject/subject.component';
import { CategoryComponent } from './category/category.component';
import { CategoryformComponent } from './categoryform/categoryform.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegistrationComponent } from './registration/registration.component'

const link: Routes = [
    { path: 'login', component : LoginComponent },
    { path: 'dashboard', component : DashboardComponent },
    { path: 'home', component : ExamhomeComponent },
    { path: 'dashboard/subjects', component: SubjectComponent },
    { path: 'dashboard/category', component: CategoryComponent },
    { path: 'dashboard/subjects/questions/:idx', component: QuestionsComponent },
    { path: 'registration', component: RegistrationComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot( link ) ],
    exports: [ RouterModule ]
})

export class RoutesModule {}