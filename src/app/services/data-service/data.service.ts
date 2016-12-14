import { Injectable } from '@angular/core';
interface subject{
  idx:number;
  name:string;
}
@Injectable()
export class DataService {

  activeCheck:boolean;
  
  playerStats={
    name: null,
    score: null,
    total: null
  }
  categoryIDX:number;

  subjectIDX:subject = <subject>{};

  constructor() { }

  check_status( isActive ){
      if( isActive == 'true') {
        return true;
      }
      else return false;
  }
}
