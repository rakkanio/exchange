import { TestBed } from '@angular/core/testing';

import { EmmiterService } from './emmiter.service';

describe('EmmiterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmmiterService = TestBed.get(EmmiterService);
    expect(service).toBeTruthy();
  });
});
