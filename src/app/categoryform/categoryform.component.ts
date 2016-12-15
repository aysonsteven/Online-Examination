import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post, POST_DATA } from '../philgo-api/v2/post';
import { DataService } from '../services/data-service/data.service';

interface form{
  idx         : any;
  content     : string;
  varchar_1  ?: boolean;
}
@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.scss'],
  inputs: [ 'category' ],
  outputs:[ 'submit' ]
})
export class CategoryformComponent implements OnInit {
  category = <POST_DATA>{};



  categoryForm: form = <form>{};
  submit             = new EventEmitter();

  constructor(
    private modal       : NgbActiveModal,
    private post        : Post,
    private dataService : DataService
  ) { 
    console.log('modal ' , this.category)
  
  }


  ngOnInit(){
    this.initialize_data();///initializing form data for editing.
  }

  initialize_data(){
    this.categoryForm.idx       = this.category.idx;
    this.categoryForm.content   = this.category.content;
    this.categoryForm.varchar_1 = this.dataService.check_status( this.category.varchar_1 );
  }







  onClickCancel(){
     this.modal.close('Close');
  }




  onClickDismiss(){
    this.modal.dismiss('dismiss');
  }



  onClickSubmit(){
    console.log( 'modal ' , this.category )
    if( this.validateForm() == false ) return;///valitates form modal

      let category         = <POST_DATA> {};
        category.id        = 'category';
        category.gid       = 'default';
        category.post_id   = 'job';
        category.category  = 'OES';
        category.subject   = 'category';
        category.content   = this.categoryForm.content;
        category.varchar_1 = this.categoryForm.varchar_1.toString();

    if( this.category.idx ){
      console.log( 'edit' );
        category.idx = this.category.idx;

      this.post.update( category, editResult =>{
        console.info(editResult)
        this.category.content   = category.content;
        this.category.varchar_1 = category.varchar_1.toString();
        this.modal.close()

      }, err => alert( "Something went wrong " + err ) )
      return;
    }
    console.log( 'add' );
      this.post.create( category, postData =>{
        console.log( 'sucess on creating category', postData )
        this.submit.emit( postData.post );
        this.modal.close();

      }, error=> alert( 'something went wrong ' +  error ) )
    
  }








  validateForm(){
    if( this.categoryForm.content == "" || this.categoryForm.content == null){
            console.log('error no content');
      return false;
    }
    return true;
  }
}
