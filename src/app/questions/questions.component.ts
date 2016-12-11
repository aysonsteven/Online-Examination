import { Component, OnInit } from '@angular/core';
import { Post, POST_DATA } from '../philgo-api/v2/post'
import { DataService } from '../services/data-service/data.service';

import { Router, ActivatedRoute, Params } from'@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  activeCheck:boolean = true;
  idx:number;
  categoryIDX:number;
  categoryInfo: POST_DATA = <POST_DATA>[];
  switch:boolean = false;
  subjectInfo: POST_DATA = <POST_DATA>[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private post: Post,
    private dataService: DataService
  ) { 
    this.idx = this.activatedRoute.snapshot.params['idx'];
    if( this.dataService.categoryIDX ){
      this.categoryIDX = this.dataService.categoryIDX;
    }
    this.getSubject();
    this.getCategory();
  }

  ngOnInit() {
  }

  getSubject(){
    if( this.idx ){
      this.post.get( this.idx, subject =>{
        console.log( "SELECTED Subject()", subject );
        this.subjectInfo = subject.post;
        if( this.subjectInfo.varchar_1 == 'false'){
          this.activeCheck = false;
        }else this.activeCheck = true;
        console.log('checking data' , this.subjectInfo)
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
}
