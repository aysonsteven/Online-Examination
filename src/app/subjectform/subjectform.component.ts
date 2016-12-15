import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../philgo-api/v2/post';
import { DataService } from '../services/data-service/data.service';

interface form {
  idx       : number;
  subject  ?: string;
  isActive  : boolean;
  duration  : number;
}

@Component({
  selector: 'app-subjectform',
  templateUrl: './subjectform.component.html',
  styleUrls: ['./subjectform.component.scss'],
  inputs: [ 'subject', 'subject_list' ]
})
export class SubjectformComponent implements OnInit {
  subject_list = [];
  subject = <POST_DATA>{}

  subject_form = <form>{}
  category_data = [];

  submit = new EventEmitter();

  constructor(
    private modal       : NgbActiveModal,
    private post        : Post,
    private dataService : DataService
  ) { 
    
  }

  ngOnInit() {
    this.getCategory();
    this.initialize_data();///initializing data for editing
  }



  initialize_data(){
    this.subject_form.idx = this.subject_form.idx;
    this.subject_form.isActive = this.dataService.check_status( this.subject.varchar_1 );
    this.subject_form.duration = this.subject.varchar_3;
    this.subject_form.subject = this.subject.content;
  }







  onClickCancel(){
     this.modal.close('Close');
  }






  onClickDismiss(){
    this.modal.dismiss( 'dismiss' );
  }








  onClickSubmit(){

    let subject           = <POST_DATA>{};
        subject.id        = "subject";
        subject.gid       = "default";
        subject.post_id   = "job";
        subject.category  = "OES";
        subject.subject   = "subject";
        subject.content   = this.subject_form.subject;
        subject.varchar_1 = this.subject_form.isActive.toString();
        subject.varchar_3 = this.subject_form.duration;

    if( this.subject.idx ) {
      
        subject.idx       = this.subject.idx;

      this.post.update( subject , updatedSubject =>{
        
        this.subject.content   = this.subject_form.subject;
        this.subject.varchar_1 = this.subject_form.isActive.toString();
        this.subject.varchar_3 = this.subject_form.duration;
        this.modal.close();

      }, error => alert( "Something went wrong " + error ) )
      return
    }

      this.post.create( subject, subjectData =>{
        console.log( 'result ', subjectData.post)
        // this.submit.emit( subjectData.post );
        this.subject_list.push( subjectData.post )
        this.modal.close();

      }, error => console.error( 'error creating subject ' + error ) )
  }









  getCategory(){
    console.log( "LIST Fired" );
    
    let data = <SEARCH_QUERY_DATA>{};
        data.fields  = 'idx, content, subject, category, varchar_1';
        data.from    = "sf_post_data";
        data.where   = "post_id='job' AND category='OES' AND subject='category' AND varchar_1='true'";
        data.orderby = "idx asc";
      this.post.search( data, categoryData =>{
        this.category_data = categoryData.search;
        console.log('success', this.category_data);

      }, error => alert( "something went wrong" + error ) )
  }




}
