/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemberRoutingService } from './member-routing.service';

describe('MemberRoutingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberRoutingService]
    });
  });

  it('should ...', inject([MemberRoutingService], (service: MemberRoutingService) => {
    expect(service).toBeTruthy();
  }));
});
