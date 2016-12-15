import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  ratio           :number;
  userID          :string;
  score           :number;
  total_questions :number;

  constructor(
    private dataService   : DataService,
    private memberService : MemberRoutingService,
    private router        : Router
  ) { 
    /////getting playerstat data from data service so that the parameters are not shown in url, it'll prevent users from editing the values.
    if( this.dataService.playerStats.score ){
      this.score = this.dataService.playerStats.score;
      this.userID = this.memberService.sessionData.id;
      this.total_questions = this.dataService.playerStats.total_questions;
      this.ratio = ( (this.score/2)/this.total_questions ) * 100;
    }else this.router.navigate( [ 'home' ] ) /// re route user to home if the playerstat from service is undefined
  }

  ngOnInit() {
  }

}
