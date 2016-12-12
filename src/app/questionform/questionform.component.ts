import { Component, OnInit, EventEmitter } from '@angular/core';
import { Post, POST_DATA } from '../philgo-api/v2/post';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface form{
  question:string;
  choice1:string;
  choice2:string;
  choice3:string;
  choice4:string;
  answer:string;
}

@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.scss'],
  inputs:['subjectidx', 'content']
})
export class QuestionformComponent implements OnInit {
  content;
  subjectidx:''
  questionForm: form = <form>{
    question: this.content
  };
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
  }

  onClickCancel(){
     this.modal.close('Close');
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
        question_data.content = this.questionForm.question;
        question_data.varchar_1 = this.questionForm.choice1;
        question_data.varchar_2 = this.questionForm.choice2;
        question_data.varchar_3 = this.questionForm.choice3;
        question_data.varchar_4 = this.questionForm.choice4;
        question_data.varchar_5 = this.questionForm.answer;
        
    if( this.idx ){
        question_data.idx = this.idx;
      this.post.update( question_data , edit_result =>{
        
        console.log('edited ', edit_result );
        this.submit.emit( edit_result );
        this.modal.close()
      }, error => console.error( 'Something went wrong' + error ) )
      return;
    }
      question_data.varchar_6 = this.subjectidx;
      this.post.create( question_data , exam_create =>{
        console.log( 'created', exam_create );
        this.submit.emit( exam_create.post )
        this.modal.close();
      }, error => alert( 'error ' +  error) )


  }

}
