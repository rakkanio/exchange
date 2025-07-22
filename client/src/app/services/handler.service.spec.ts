import { TestBed } from '@angular/core/testing';

import { Handler } from './handler.service';

describe('HandlerService', () => {
  let service: Handler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Handler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
