import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post, POST_DATA } from '../philgo-api/v2/post';

interface form{
  idx:any;
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
  submit = new EventEmitter();

  constructor(
    private modal : NgbActiveModal,
    private post  : Post
  ) { 
    console.log('modal ' , this.category)
  
  }


  initialize_data(){
    this.categoryForm.idx = this.category.idx;
    this.categoryForm.content = this.category.content;
    this.categoryForm.varchar_1 = this.category.varchar_1;
  }


  ngOnInit(){
  this.initialize_data();
  }




  onClickCancel(){
     this.modal.close('Close');
  }




  onClickDismiss(){
    this.modal.dismiss('dismiss');
  }



  onClickSubmit(){
    console.log('modal ' , this.category)
      let category        = <POST_DATA> {};
        category.id       = 'category';
        category.gid      = 'default';
        category.post_id  = 'job';
        category.category = 'OES';
        category.subject  = 'category';

    if( this.validateForm() == false ) return;
    if( this.category ){
      console.log('edit');
        category.idx = this.category.idx;
        category.content = this.categoryForm.content;
        category.varchar_1 = this.categoryForm.varchar_1.toString();

      this.post.update( category, editResult =>{
        console.info(editResult)
        this.category.content = category.content;
        this.category.varchar_1 = category.varchar_1.toString();
        this.modal.close()

      }, err =>{})
      return;
    }
    console.log('add');
        category.content = this.categoryForm.content;
        category.varchar_1 = this.categoryForm.varchar_1.toString();

      this.post.create( category, postData =>{
        console.log( 'sucess on creating category', postData )
        this.submit.emit( postData.post );
        this.modal.close();

      }, error=> alert( 'something went wrong ' +  error ) )
    
  }








  validateForm(){
    if( this.categoryForm.content == "" || this.categoryForm.content == null){
            console.log('error');
      return false;
    }
    return true;
  }
}
