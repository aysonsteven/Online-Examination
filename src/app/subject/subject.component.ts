import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../philgo-api/v2/post';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectformComponent } from '../subjectform/subjectform.component';
import { DataService } from '../services/data-service/data.service';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {


  
  search:string = '';
  category_data = [];
  filtered_category;
  subject_data = [];
  constructor(
    private post: Post,
    private router: Router,
    private modal: NgbModal,
    private dataService: DataService,
    private memberService: MemberRoutingService
  ) {
    this.memberService.adminData();
    this.getCategory();
    
   }

  ngOnInit() {
  }






  onEnterSearch(event) {
    if(event.keyCode == 13) {
      console.log( 'search' );
      let data = <SEARCH_QUERY_DATA> {};
          data.fields = 'idx, content, subject, category, varchar_1, varchar_2, varchar_3';
          data.from = 'sf_post_data';
          data.where = "post_id='job' AND category='OES' AND subject='subject' AND content LIKE '%" + this.search +"%' AND varchar_2 in ('" + this.filtered_category + "')";
          data.orderby = "idx asc";

      this.passingSubject_data( data );
    }
  }
  
  getSubject(  ){

    if( this.search != '' ) return; 
    console.log( "LIST Fired", this.filtered_category );
    let data = <SEARCH_QUERY_DATA>{};
        data.fields   = 'idx, content, subject, category, varchar_1, varchar_2, varchar_3';
        data.from     = "sf_post_data";
        data.where    = "post_id='job' AND category='OES' AND subject='subject' AND varchar_2 in('" + this.filtered_category +"')";
        data.orderby  = "idx asc";
      
      this.passingSubject_data( data );
  }


  passingSubject_data( data ){
      this.post.search( data, fetched_data =>{
        this.subject_data = fetched_data.search;
        console.log('success this data', this.subject_data);
      }, error => alert( "something went wrong" + error ) )
  }




  getCategory(){
    console.log( "LIST Fired" );
    let data         = <SEARCH_QUERY_DATA>{};
        data.fields  = 'idx';
        data.from    = "sf_post_data";
        data.where   = "post_id='job' AND category='OES' AND subject='category' AND varchar_1='true'";
        data.orderby = "idx asc";
      this.post.search( data, categoryData =>{
        this.category_data = categoryData.search;
        console.log('checking ' , this.category_data )
        this.filteringCategory( categoryData.search );
      }, error => alert( "something went wrong" + error ) )
      
  }






  filteringCategory( val ){
    
        let temp = [];
        for( let key in val ){
          temp.push(this.category_data[key].idx);
        }
          
        this.filtered_category = temp.join("','") ;
        this.getSubject();
  }





  onClickEdit( subject ){
    console.log( 'Subject Form Model Fired', subject.idx );

    let modalReference = this.modal.open( SubjectformComponent );

        modalReference.componentInstance.subject = subject;        
  }





  onClickDelete( idx, index ){
    let confirmDelete = confirm( 'Are you sure you want to delete this?' );
    if( confirmDelete == true ){

      console.log( 'delete' , idx );
      this.post.delete( idx, res=>{
        this.subject_data.splice( index, 1 );
        alert( 'deleted ' + idx );
      }, error=>alert( 'error '+ error ) )

    }else console.log( 'canceled!' )
  }







  onClickAddQuestions( idx, categoryIDX ){
    this.router.navigate(['dashboard/subjects/questions', idx]);
    this.dataService.categoryIDX = categoryIDX;
  }






  onClickCreateSubjectModal(){
    let modalReference = this.modal.open( SubjectformComponent );
        modalReference.componentInstance.submit.subscribe( post=>{
          this.subject_data.push (post )
          console.log( 'check result' + post )
        })
  }

}
