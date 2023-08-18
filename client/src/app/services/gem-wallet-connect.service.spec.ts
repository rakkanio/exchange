import { TestBed } from '@angular/core/testing';

import { GemWalletConnectService } from './gem-wallet-connect.service';

describe('GemWalletConnectService', () => {
  let service: GemWalletConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GemWalletConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
