import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserEventComponent } from './new-user-event.component';

describe('NewUserEventComponent', () => {
  let component: NewUserEventComponent;
  let fixture: ComponentFixture<NewUserEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
