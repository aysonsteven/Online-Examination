import { Component, Input, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post, POST_DATA } from '../philgo-api/v2/post';

interface form{
  name?: string;
  isActive: boolean;
}
@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.scss'],
  inputs: [ 'category', 'idx', 'content', 'varchar_1' ],
  outputs:[ 'submit' ]
})
export class CategoryformComponent  {

  idx: '';
  content: '';
  varchar_1:boolean = false;

  categoryForm: form = <form>{
    isActive: this.varchar_1,
    name: this.content
  };
  submit = new EventEmitter();

  constructor(
    private modal: NgbActiveModal,
    private post: Post
  ) { }

  onClickCancel(){
     this.modal.close('Close');
  }
  onClickDismiss(){
    this.modal.dismiss('dismiss');
  }

  onClickSubmit(){
      let category = <POST_DATA> {};
        category.id = 'category';
        category.gid = 'default';
        category.post_id = 'job';
        category.category = 'OES';
        category.subject = 'category';
    if( this.validateForm() == false ) return;
    if( this.idx ){
      console.log('edit');
        category.idx = this.idx;
        category.content = this.categoryForm.name;
        category.varchar_1 = this.categoryForm.isActive.toString();
      this.post.update( category, editResult =>{
        this.submit.emit( editResult )
        console.info(editResult)
        this.modal.close()
      }, err =>{})
      return;
    }
    console.log('add');
        category.content = this.categoryForm.name;
        category.varchar_1 = this.categoryForm.isActive.toString();
      this.post.create( category, postData =>{
        console.log( 'sucess on creating category', postData )
        this.submit.emit( postData.post );
        this.modal.close();
      }, error=> alert( 'something went wrong ' +  error ) )
    
  }

  validateForm(){
    if( this.categoryForm.name == "" || this.categoryForm.name == null){
            console.log('error');
      return false;
    }
    return true;
  }
}
