import { Component, OnInit } from '@angular/core';
import { Member, MEMBER_DATA, MEMBER_LOGIN_DATA} from '../philgo-api/v2/member';
import { Router } from '@angular/router';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import 'rxjs/add/operator/timeout';
interface status{
  userID?       : string;
  userPassword? : string;
  error?        : string;
  loader?       : boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formStatus: status = <status>{};
  isValid;
  loginForm: MEMBER_LOGIN_DATA = <MEMBER_LOGIN_DATA>{};
  constructor(
    private user        : Member,
    private router      : Router,
    private memberSrvc  : MemberRoutingService
  ) { 
    this.memberSrvc.checkLoginData();
    
  }

  ngOnInit() {
  }

  onClickLogin(){
    //validations
    this.isValid = true;
    this.resetStatus();
    this.validateForm();

    if( this.isValid == false ) return;

    this.formStatus.loader = true;
    //end of validations

    this.user.login( this.loginForm , loginData=>{
      this.formStatus.loader = false;
      this.memberSrvc.sessionData = loginData;
      this.checkUserAndAdmin();
      console.info('check loginInfo', loginData.id )


    }, error=>{
      this.formStatus.loader = false;
      this.formStatus.error = 'Server' + error
    }, ()=>{
      this.formStatus.loader = false;
      console.log('completed');
    })
  }







  resetStatus(){
    this.formStatus = {};
  }









  checkUserAndAdmin(){
    if( this.memberSrvc.sessionData.id == this.memberSrvc.adminroute.id ){
      this.router.navigate(['dashboard']);
      return;
    }
    this.router.navigate(['home']);
  }








  onFocusUserID(){
    this.formStatus.userID = '';
  }







  onClickReset(){
    this.loginForm =  <MEMBER_LOGIN_DATA> {};
    this.resetStatus();
  }






  validateForm(){
    if( this.loginForm.id == null || this.loginForm.id == '' ){
      this.formStatus.userID = 'insert UserID';
      this.isValid = false;

    }else if( this.loginForm.id.length <=2 ){
      this.formStatus.userID = 'UserID must consist atleast 3 characters';
      this.isValid = false;
    }

    if( this.loginForm.password == null || this.loginForm.password == '' ){
      this.formStatus.userPassword = 'insert Password';
      this.isValid = false;
      
    }else if( this.loginForm.password.length <= 5 ){
      this.formStatus.userPassword = 'password must consist atleast 6 characters';
      this.isValid = false;
    }
  }
  

}
