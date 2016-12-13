import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryformComponent } from '../categoryform/categoryform.component';
import { Post, SEARCH_QUERY_DATA, POST_DATA } from '../philgo-api/v2/post';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  inputs: [ 'category' ]
})

export class CategoryComponent implements OnInit {
  search:string =  '';
  val = 1;
  category_data = [];
  constructor(
    private router        : Router,
    private modal         : NgbModal,
    private post          : Post,
    private memberService : MemberRoutingService
  ) {
    this.memberService.checkLoginData();
    this.getCategory();
   }




  ngOnInit() {
  }



  onEnterSearch(event) {
    if(event.keyCode == 13) {
      console.log( 'search' );
      let data = <SEARCH_QUERY_DATA> {};
          data.fields = 'idx, content, subject, category, varchar_1';
          data.from = 'sf_post_data';
          data.where = "post_id='job' AND category='OES' AND subject='category' AND content LIKE '%" + this.search +"%'";
          data.orderby = "idx asc";

        this.post.search( data, fetched_data =>{
          this.category_data = fetched_data.search;
          console.log( "search result", fetched_data );

        }, error => alert( "error on search : " + error ) )
    }
  }









  onClickCreateCategory(){
    let modalReference = this.modal.open( CategoryformComponent );
        modalReference.componentInstance.submit.subscribe( post=>{
          this.category_data.push (post )
          console.log( 'check result' + post )
        })
  }










  getCategory(){
    if( this.search != ''  ) return;
    console.log( "LIST Fired" );

    let data = <SEARCH_QUERY_DATA>{};
        data.fields  = 'idx, content, subject, category, varchar_1';
        data.from    = "sf_post_data";
        data.where   = "post_id='job' AND category='OES' AND subject='category'";
        data.orderby = "idx asc";

      this.post.search( data, categoryData =>{
        this.category_data = categoryData.search;
        console.log('success', this.category_data);

      }, error => alert( "something went wrong" + error ) )
  }










  onClickDelete( idx, index ){
    let confirmDelete = confirm('Are you sure you want to delete this?');
    if( confirmDelete == true){

      console.log('delete' , idx);
      this.post.delete( idx, res=>{
        this.category_data.splice( index, 1 );
        console.log('deleted ' + idx);

      }, error=>alert('error '+ error))

    }else console.log('canceled!')
  }











  onClickEdit( idx, content, isActive ){
    console.log( 'edit Fired' , idx );

    let modalReference = this.modal.open( CategoryformComponent );
        modalReference.componentInstance.idx = idx;
        modalReference.componentInstance.categoryForm.name = content;
        modalReference.componentInstance.categoryForm.isActive = isActive;

        modalReference.componentInstance.submit.subscribe( category =>{
          console.log( 'respone ', category );
          this.getCategory();
        })
  }

}
