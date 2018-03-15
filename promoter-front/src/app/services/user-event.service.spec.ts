import { TestBed, inject } from '@angular/core/testing';

import { UserEventService } from './user-event.service';

describe('UserEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEventService]
    });
  });

  it('should be created', inject([UserEventService], (service: UserEventService) => {
    expect(service).toBeTruthy();
  }));
});
