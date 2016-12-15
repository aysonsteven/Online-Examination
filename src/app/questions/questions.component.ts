import { Component, OnInit } from '@angular/core';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../philgo-api/v2/post'
import { DataService } from '../services/data-service/data.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionformComponent } from '../questionform/questionform.component';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import { Router, ActivatedRoute, Params } from'@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  question_data = [];
  exam_idx:number;
  activeCheck:boolean = true;
  idx:number;
  categoryIDX:number;
  categoryInfo: POST_DATA = <POST_DATA>[];
  switch:boolean = false;
  subjectInfo: POST_DATA  = <POST_DATA>[];
  constructor(
    private activatedRoute  : ActivatedRoute,
    private post            : Post,
    private dataService     : DataService,
    private modal           : NgbModal,
    private memberService   : MemberRoutingService
  ) { 
    this.memberService.adminData();
    this.idx = this.activatedRoute.snapshot.params['idx'];
    if( this.dataService.categoryIDX ){
      this.categoryIDX = this.dataService.categoryIDX;
    }
    
    this.getSubject();
    this.getCategory();

    this.getQuestions();
  }

  ngOnInit() {
  }






  getSubject(){
    if( this.idx ){
      this.post.get( this.idx, subject =>{
        console.log( "SELECTED Subject()", subject );
        this.subjectInfo = subject.post;

        if( this.subjectInfo.varchar_1 == 'false' ){
          this.activeCheck = false;
        }else this.activeCheck = true;
        console.log( 'checking data' , this.subjectInfo )

      }, err => alert( "Something went wrong " + err ) );
      return
    }

  }









  getCategory(){
    if( this.categoryIDX ){
      this.post.get( this.categoryIDX , category => {
        this.categoryInfo = category.post;
      }, err => alert( 'Something went wrong' + err ) )
    }
  }

  onClickAddQuestions(){
    console.log('passing idx',this.idx)
    let modalReference = this.modal.open( QuestionformComponent );
        modalReference.componentInstance.subjectidx = this.idx
        modalReference.componentInstance.questions_list = this.question_data;
  }





  onClickEdit( question ){
    let modalReference = this.modal.open( QuestionformComponent );

        modalReference.componentInstance.question = question;


  }

  getQuestions(){
    let data = <SEARCH_QUERY_DATA>{}
        data.fields = "idx, content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5";
        data.from   = "sf_post_data";
        data.where  = "post_id='job' AND subject='exam' AND varchar_6='" + this.idx + "'";
    this.post.search( data, question_result =>{
      this.question_data = question_result.search;
      console.log('checking exam' , this.question_data)
    }, err =>{})
  }






  onClickDelete( idx, index ){
    let confirmDelete = confirm( 'Are you sure you want to delete this?' );

    if( confirmDelete == true ){
      console.log( 'deleting' , idx );
      this.post.delete( idx, res=>{
        alert('deleted ' + idx);
        this.question_data.splice( index, 1 );

      }, error=>alert( 'error '+ error ) )

    }else console.log( 'canceled!' )
  }
  

}
