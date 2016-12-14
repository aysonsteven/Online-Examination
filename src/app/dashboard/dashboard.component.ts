import { Component, OnInit } from '@angular/core';

import { MemberRoutingService } from '../services/user-routing/member-routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private memberSrvc: MemberRoutingService
  ) { 
    this.memberSrvc.adminData();
   }

  ngOnInit() {
  }

}
