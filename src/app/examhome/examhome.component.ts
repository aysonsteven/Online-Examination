import { Component, OnInit } from '@angular/core';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../philgo-api/v2/post';
import { DataService } from '../services/data-service/data.service';
import { Member } from '../philgo-api/v2/member';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examhome',
  templateUrl: './examhome.component.html',
  styleUrls: ['./examhome.component.scss']
})
export class ExamhomeComponent implements OnInit {
  enabled:boolean = false;
  selected_category:string;
  category_data = [];
  subject_data = [];

  constructor(
    private post          : Post,
    private router        : Router,
    private dataService   : DataService,
    private memberService : MemberRoutingService,
    private member        : Member
  ) {
    if( this.memberService.checkLoginData() == true ) this.router.navigate( [ 'dashboard' ] );
    this.getSubject();
   }







  ngOnInit() {
  }






  getSubject( ){
    let data = <SEARCH_QUERY_DATA>{};
        data.fields   = "idx, content";
        data.from     = "sf_post_data";
        data.where    = "post_id='job' AND subject='subject' AND varchar_1 ='true'";
      this.post.search( data, fetchedsubject =>{
        this.subject_data = fetchedsubject.search;
        if(this.subject_data.length == 0) this.enabled = false;
        else this.enabled = true;
        console.log( 'fetched subject', this.subject_data.length )
      }, error =>{})
  }




  onChangeGetExam( subject_idx ){
    this.router.navigate( [ 'exam' ] );
    this.dataService.subjectIDX.idx = subject_idx;
  }
}
