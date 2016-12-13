import { Component, OnInit } from '@angular/core';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../philgo-api/v2/post';
import { Router } from '@angular/router';

import { DataService } from '../services/data-service/data.service';
import { MemberRoutingService } from '../services/user-routing/member-routing.service'

import * as _ from 'lodash';

@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.scss']
})
export class ExampageComponent implements OnInit {
  current_choices;
  score: number = 0;
  validate;
  loading:boolean = true;
  ctr: number = 0;
  ctrRandom:number;
  subject_data;
  exam_data =[];
  subject:number;
  questionCount;
  current_question;

  constructor(
    private dataService : DataService,
    private post        : Post,
    private router      : Router,
    private authSrvc    : MemberRoutingService
  ) {
    this.subject = this.dataService.subjectIDX.idx;
    if( this.subject ){
      this.getExam();
      this.getSubject();

    }else{
      alert( 'select subject first' );
      this.router.navigate( [ 'home' ] );
    }
   }

  ngOnInit() {
  }
  getSubject(){
    this.post.get( this.subject, result =>{
      this.subject_data = result.post;
      console.log('check content', this.subject_data.content)
      console.log('category ', result )

    }, error =>{})
  }




  getExam(){
    let data = <SEARCH_QUERY_DATA>{};
        data.fields   = "idx, content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5";
        data.from     = "sf_post_data";
        data.where    = "post_id='job' AND category='OES' AND subject='exam' AND varchar_6 ='" + this.subject + "'";
        data.orderby  = "idx asc";

      this.post.search( data, fetchedexam =>{
        this.exam_data = fetchedexam.search;
        this.questionCount = JSON.parse(JSON.stringify( fetchedexam.search ) );
        this.getCurrentQuestion();

      }, error =>{})
  }

  extractingChoices( i ){
    let temp = []
    let tempval ={}
    let tempq = this.exam_data[i]
    for( let key in tempq ){
      temp.push( tempq[key] )
    }
    tempval =
      { 'choices' : [
        {'key': 1, 'value':temp[2]}, 
        {'key': 2, 'value':temp[3]},
        {'key': 3, 'value':temp[4]},
        {'key': 4, 'value':temp[5]} 
        ]};
    this.current_choices = _.shuffle(tempval['choices'])
    console.log( '2nd ', _.shuffle(tempval['choices']) );
  }





  getCurrentQuestion(){
      this.ctrRandom = Math.floor( Math.random() * ( this.exam_data.length - 1 + 1 ) ) + 0;
      this.current_question = this.exam_data[ this.ctrRandom ];
      
      if( this.ctrRandom ) this.loading = false;
      this.extractingChoices(this.ctrRandom);
  }






  onClickProceed( val? ){
    console.log( 'answer',  val, ' right answer', this.current_question.varchar_5 )

    if( this.validate_exam( val ) == false ) return;
    this.validate = '';
    this.ctr+=1;

    if( val == this.current_question.varchar_5 ){
      this.score+= 2;
      console.log( 'check', this.score )
    }
    this.randomizedQuestions();
  }





  validate_exam( val ){
    if( val == null ){
      this.validate = 'No answer selected'
      console.log( this.validate );
      return false;
    }
    this.validate = '';
    return true;
  }

  randomizedQuestions(){
      
    // if( ! this.authSrvc.sessionData ) {  
    //   this.dataService.playerStats.name = this.playerName;
    //   console.info( 'name', this.playerName, ' ', this.playerStats.playerStats.name )
    // }
    if ( this.ctr >= this.questionCount.length ){
      console.log( 'end' );
      this.router.navigate( [ 'final' ] );
      this.dataService.playerStats.score = this.score;
      this.dataService.playerStats.total = this.questionCount.count;
  }

    this.exam_data.splice( this.ctrRandom, 1 );    
    this.ctrRandom = Math.floor( Math.random() * ( this.exam_data.length - 1 + 1 ) );
    
    this.current_question = this.exam_data[ this.ctrRandom ];
    this.extractingChoices( this.ctrRandom );
  }

}
