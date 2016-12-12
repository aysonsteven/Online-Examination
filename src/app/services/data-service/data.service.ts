import { Injectable } from '@angular/core';
interface subject{
  idx:number;
  name:string;
}
@Injectable()
export class DataService {
  
  playerStats={
    name: null,
    score: null,
    total: null
  }
  categoryIDX:number;

  subjectIDX:subject = <subject>{};

  constructor() { }

}
