import { Component } from '@angular/core';
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectformComponent } from '../../component/subjectform/subjectform.component';
import { DataService } from '../../services/data-service/data.service';
import { MemberRoutingService } from '../../services/user-routing/member-routing.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent {
  
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
    this.memberService.checkLoginData();
    this.getSubject();
   }








  onEnterSearch(event) {
    if(event.keyCode == 13) {
      console.log( 'search' );
      let data = <SEARCH_QUERY_DATA> {};
          data.fields = 'idx, content, subject, category, varchar_1, varchar_3';
          data.from = 'sf_post_data';
          data.where = "post_id='job' AND category='OES' AND subject='subject' AND content LIKE '%" + this.search +"%'";
          data.orderby = "idx asc";

      this.passingSubject_data( data );
    }
  }
  





  getSubject(  ){
    if( this.search != '' ) return; 
    console.log( "LIST Fired", this.filtered_category );
    let data = <SEARCH_QUERY_DATA>{};
        data.fields   = 'idx, content, subject, category, varchar_1, varchar_3';
        data.from     = "sf_post_data";
        data.where    = "post_id='job' AND category='OES' AND subject='subject'";
        data.orderby  = "idx asc";
      
      this.passingSubject_data( data );
  }






  passingSubject_data( data ){
      this.post.search( data, fetched_data =>{
        this.subject_data = fetched_data.search;
        console.log('success this data', this.subject_data);
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
        console.log( 'deleted ' + idx );
      }, error=>alert( 'error '+ error ) )

    }else console.log( 'canceled!' )
  }







  onClickAddQuestions( idx, categoryIDX ){
    this.router.navigate(['dashboard/subjects/questions', idx]);
    this.dataService.categoryIDX = categoryIDX;
  }






  onClickCreateSubjectModal(){
    let modalReference = this.modal.open( SubjectformComponent );
        modalReference.componentInstance.subject_list = this.subject_data;

  }

}
