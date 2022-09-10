import { TestBed } from '@angular/core/testing';

import { AlgoSignerService } from './algo-signer.service';

describe('AlgoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgoSignerService = TestBed.get(AlgoSignerService);
    expect(service).toBeTruthy();
  });
});
