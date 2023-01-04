import { TestBed } from '@angular/core/testing';

import { WagmiService } from './wagmi.service';

describe('WagmiService', () => {
  let service: WagmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WagmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
