import { Component, OnInit } from '@angular/core';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import { Member, MEMBER_DATA } from '../philgo-api/v2/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  constructor(
    private sessionSrvc : MemberRoutingService,
    private router      : Router,
    private member      : Member
  ) {
   }

  ngOnInit() {
  }


  onClickLogout(){
    this.member.logout();
    this.sessionSrvc.logged = false;
    this.sessionSrvc.sessionData = null;
    this.router.navigate(['login']);
  }


}
