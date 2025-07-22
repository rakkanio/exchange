import { TestBed } from '@angular/core/testing';

import { Emmiter } from './emmiter.service';

describe('EmmiterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Emmiter = TestBed.get(Emmiter);
    expect(service).toBeTruthy();
  });
});
