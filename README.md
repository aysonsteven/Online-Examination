# EnglishQuiz-Module
English Quiz Module


#Installation
    npm install @types/lodash --save
    npm install --save @ng-bootstrap/ng-bootstrap
    copy or add as submodule EnglishQuiz-Module
    @index.html link the bootstrap.min.css and also the js files.
    <link rel="stylesheet" href="./assets/bootstrap.min.css">
    <script src="./assets/jquery-3.1.1.min.js"></script> 
    <script src="./assets/bootstrap.min.js"></script>

    then copy the css and js module's assets to your assets folder

    on app.module import ngb Module it should be like this:
    import ngBootstrap to the main module : mport {NgbModule} from '@ng-bootstrap/ng-bootstrap';
    imports: [NgbModule.forRoot(), ...]
    
#### import the quiz module
#####import { QuizModule } from './quizmodule/quiz.module';
#####imports: [ QuizModule ]
#####After installation you can now use the English Quiz Module


###UPDATE:
####Dec 1, 2016 04:00PM Questions CRUD
####Dec 4, 2016 09:AM Routing
####Dec 4, 2016 10:AM randomizing quiz without repeat
####Dec 4, 2016 10:AM form Validations
####Dec 6, 2016 03:00PM posting registered user's stats
####Dec 7, 2016 03:30AM Let non registered user to take quiz
####Dec 7, 2016 10:40AM Searching/filtering
####Dec 7, 2016 02:46PM Hide parameters to prevent users from changing the results
####Dec 7, 2016 08:00PM Moved the admin/user checking to the login/authentication component
####Dec 9, 2016 04:46AM Randomized Choices with keyindex
####Dec 9, 2016 05:30AM Quiz Timer

###TODOs
####File Structure
####Student Panel

###Admin:
    id: aysonsteven
    pw: mypassword

https://quizbuilder-7c420.firebaseapp.com

###backup and testing.
    englishquizsample.esy.es