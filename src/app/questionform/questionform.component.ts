import { Component, OnInit, EventEmitter } from '@angular/core';
import { Post, POST_DATA } from '../philgo-api/v2/post';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface form{
  question  : string;
  choice1   : string;
  choice2   : string;
  choice3   : string;
  choice4   : string;
  answer    : string;
}

@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.scss'],
  inputs:['question', 'questions_list']
})
export class QuestionformComponent implements OnInit {
  questions_list =[];
  question = <POST_DATA>{};
  content;
  subjectidx:''
  questionForm: form = <form>{};
  exam_idx:number;
  activeCheck:boolean = true;
  idx:number;
  categoryIDX:number;
  categoryInfo: POST_DATA = <POST_DATA>[];
  switch:boolean = false;
  subjectInfo: POST_DATA = <POST_DATA>[];


  submit = new EventEmitter();
  constructor(
    private post: Post,
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initialize_data();
  }

  onClickCancel(){
     this.modal.close('Close');
  }

  initialize_data(){
    this.questionForm.question = this.question.content;
    this.questionForm.choice1  = this.question.varchar_1;
    this.questionForm.choice2  = this.question.varchar_2;
    this.questionForm.choice3  = this.question.varchar_3;
    this.questionForm.choice4  = this.question.varchar_4;
    this.questionForm.answer   = this.question.varchar_5;
  }

  onClickDismiss(){
    this.modal.dismiss( 'dismiss' );
  }


  onClickSave(){
    console.log('save question');
    let question_data           = <POST_DATA>{};
        question_data.id        = 'questionaires';
        question_data.gid       = 'default';
        question_data.post_id   = 'job';
        question_data.category  = 'OES';
        question_data.subject   = 'exam';
        question_data.content   = this.questionForm.question;
        question_data.varchar_1 = this.questionForm.choice1;
        question_data.varchar_2 = this.questionForm.choice2;
        question_data.varchar_3 = this.questionForm.choice3;
        question_data.varchar_4 = this.questionForm.choice4;
        question_data.varchar_5 = this.questionForm.answer;
        
    if( this.question.idx ){
      this.update( question_data )
      return;
    }

      question_data.varchar_6 = this.subjectidx;
      this.post.create( question_data , exam_create =>{
        console.log( 'created', exam_create );
        this.questions_list.push(exam_create.post)
        this.modal.close();

      }, error => alert( 'error ' +  error) )


  }

  update( question_data ){
      question_data.idx = this.question.idx;
      this.post.update( question_data , edit_result =>{
        
        console.log('edited ', edit_result );
        this.sending_data(); ///sending the new data to the list instead of requesting all the new set of updated data from server.
        this.modal.close()
      }, error => console.error( 'Something went wrong' + error ) )
  }


  sending_data(){
    ///////////sending back the data from modal to the list, so the list will update without requesting all the date froms erver.
        this.question.content   = this.questionForm.question;
        this.question.varchar_1 = this.questionForm.choice1;
        this.question.varchar_2 = this.questionForm.choice2;
        this.question.varchar_3 = this.questionForm.choice3;
        this.question.varchar_4 = this.questionForm.choice4;
        this.question.varchar_5 = this.questionForm.answer;
  }



}
