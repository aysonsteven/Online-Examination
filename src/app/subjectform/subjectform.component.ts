import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../philgo-api/v2/post';

interface form {
  subject   : string;
  isActive  : boolean;
  category  : string;
  duration  : number;
}

@Component({
  selector: 'app-subjectform',
  templateUrl: './subjectform.component.html',
  styleUrls: ['./subjectform.component.scss'],
  inputs: [ 'content', 'isActive', 'category', 'duration' ]
})
export class SubjectformComponent implements OnInit {
  idx;
  isActive:boolean = false;
  content;
  category;
  duration:number;

  subject_form = <form>{
    isActive: this.isActive,
    subject:  this.content,
    category: this.category,
    duration: this.duration
  };
  category_data = [];

  submit = new EventEmitter();

  constructor(
    private modal : NgbActiveModal,
    private post  : Post
  ) { 
    
  }

  ngOnInit() {
    this.getCategory();
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
    console.log( 'selected ' + this.subject_form.category )
    if( this.idx ) {
      console.log('edit ',  this.idx);
        subject.idx       = this.idx;
        subject.content   = this.subject_form.subject;
        subject.varchar_1 = this.subject_form.isActive.toString();
        subject.varchar_2 = this.subject_form.category;
        subject.varchar_3 = this.subject_form.duration;
      this.post.update( subject , updatedSubject =>{
        console.log('result edit ', updatedSubject );
        this.submit.emit( updatedSubject );
        this.modal.close();
      }, error =>{})
      return
    }

        subject.content   = this.subject_form.subject;
        subject.varchar_1 = this.subject_form.isActive.toString();
        subject.varchar_2 = this.subject_form.category;
        subject.varchar_3 = this.subject_form.duration;

      this.post.create( subject, subjectData =>{
        this.submit.emit( subjectData.post )
        this.modal.close();

      }, error => console.error( 'error creating subject ' + error ) )
    console.log('check value', JSON.stringify(this.subject_form.category))
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
