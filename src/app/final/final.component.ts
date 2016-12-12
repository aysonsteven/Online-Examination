import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  
  userID:string;
  score:number;

  constructor(
    private dataService: DataService,
    private memberService: MemberRoutingService
  ) { 
    if( this.dataService.playerStats.score ){
      this.score = this.dataService.playerStats.score;
      this.userID = this.memberService.sessionData.id;
    }
  }

  ngOnInit() {
  }

}
