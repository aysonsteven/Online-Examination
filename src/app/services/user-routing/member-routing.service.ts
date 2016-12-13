import { Injectable } from '@angular/core';
import { Member } from '../../philgo-api/v2/member';
import { MEMBER_LOGIN_DATA, SEARCH_QUERY_DATA} from '../../philgo-api/v2/philgo-api-interface';
import { Router } from '@angular/router';

@Injectable()
export class MemberRoutingService {
  userInfo = {
    name:''
  };
  logged: boolean;
  sessionData = <MEMBER_LOGIN_DATA>{};
  adminroute = <MEMBER_LOGIN_DATA>{};
  constructor(
    private router: Router,
    public member: Member
  ) { 
    this.adminData();
    this.sessionData = this.member.getLoginData();

  }
  checkLoginData(){
    console.info( ' session service checklogin(()) ** ' );
    if( this.sessionData ){
      


      if( this.sessionData && ( this.sessionData.id != this.adminroute.id ) ){
        console.log( 'user', this.adminroute.id )
        this.router.navigate( [ 'home' ] );
        return;
      }
      
    }
    if( ! this.sessionData ){
      this.router.navigate( [ 'login' ] )
      return
    }
  }


  checkAdminLogin(){
 
 
    
  }


  adminData(){
    if( this.sessionData ){
      let data        = <SEARCH_QUERY_DATA> {};
          data.fields = "id, name, varchar_1";
          data.from   = "sf_member";
          data.where  = "stamp='1481621041'"
      this.member.search( data, res=>{
        this.adminroute = res.search[0];
        console.info( 'admin search', this.adminroute.id )
        this.checkLoginData();
      }, e=>{
        alert( "error on search: " + e )
      })
    }
  }

}
