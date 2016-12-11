import { Component, OnInit } from '@angular/core';
import { Member, MEMBER_DATA } from '../philgo-api/v2/member';
import { Router } from '@angular/router';
import { MemberRoutingService } from '../services/user-routing/member-routing.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  error:string;
  message: string;
  registrationForm : MEMBER_DATA = <MEMBER_DATA> {};

  constructor(
    private member: Member,
    private router: Router,
    private memberService: MemberRoutingService
  ) { 
    this.memberService.sessionData = this.member.logged();
    this.checLoginData();
  }

  ngOnInit() {
  }


  onClickRegister(){
    if( this.validation() == false ) return;
    this.member.register( this.registrationForm, res=>{
      this.memberService.logged = true;
      console.log( 'registered', res )
      this.checLoginData();
      // this.checLoginData();
    }, e=>{
      console.error(e);
    })
  }

  checLoginData(){
    this.memberService.sessionData = this.member.getLoginData();
    if( this.memberService.sessionData ){
      if( this.memberService.sessionData.id == this.memberService.adminroute.id ){
        this.router.navigate(['dashboard']);
        return;
      }
      this.router.navigate( [ 'home' ] );
    }
    console.log('not logged in')
  }


  loadUserData(){
  if(!this.memberService.logged) return;
  //
  this.member.data( userdata => {
    this.registrationForm.id = this.memberService.sessionData.id;
    this.registrationForm.name = userdata.name;
    this.registrationForm.email = userdata.email;

  }, error =>{
    alert(error);
  })
}

  validation(){
    if( this.registrationForm.id == null || this.registrationForm.id == '' ){
      this.error = 'User ID is required'
      return false;
    }
  }

}
