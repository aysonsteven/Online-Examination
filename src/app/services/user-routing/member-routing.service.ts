import { Injectable } from '@angular/core';
import { Member } from '../../philgo-api/v2/member';
import { MEMBER_LOGIN_DATA, SEARCH_QUERY_DATA} from '../../philgo-api/v2/philgo-api-interface';
import { Router } from '@angular/router';

@Injectable()
export class MemberRoutingService {
  logged: boolean;
  sessionData = <MEMBER_LOGIN_DATA>{};
  adminroute = <MEMBER_LOGIN_DATA>{};
  constructor(
    private router: Router,
    public member: Member
  ) { 
    this.adminroute.id = 'aysonsteven';
    this.adminroute.session_id = '00f9f98f9b41f684afabbe3c77e63eb7';
    // this.adminData();
    this.sessionData = this.member.logged();
    this.checkLoginData();

  }
  checkLoginData(){
    console.info( ' session service checklogin(()) ** ' );
    if( this.sessionData && (this.sessionData.id == this.adminroute.id && this.sessionData.session_id == this.adminroute.session_id ) ){
      console.log('admin', this.adminroute.id)
      this.router.navigate(['dashboard']);
      return;
    }
  }

  adminData(){
     let data = <SEARCH_QUERY_DATA> {};
     data.fields = "id, name";
     data.from = "sf_member";
     data.where = "stamp='1480649472'"
     this.member.search( data, res=>{
       this.adminroute = res.search[0];
       console.info('admin search', this.adminroute.id)
     }, e=>{
       alert("error on search: " + e )
     })
    }

}
