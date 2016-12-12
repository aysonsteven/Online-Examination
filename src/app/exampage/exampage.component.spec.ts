/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExampageComponent } from './exampage.component';

describe('ExampageComponent', () => {
  let component: ExampageComponent;
  let fixture: ComponentFixture<ExampageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
