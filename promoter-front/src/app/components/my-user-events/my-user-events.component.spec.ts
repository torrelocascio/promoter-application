import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUserEventsComponent } from './my-user-events.component';

describe('MyUserEventsComponent', () => {
  let component: MyUserEventsComponent;
  let fixture: ComponentFixture<MyUserEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyUserEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
