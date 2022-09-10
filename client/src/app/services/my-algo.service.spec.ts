import { TestBed } from '@angular/core/testing';

import { MyAlgoService } from './my-algo.service';

describe('MyAlgoService', () => {
  let service: MyAlgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAlgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
