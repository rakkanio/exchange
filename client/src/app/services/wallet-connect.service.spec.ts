import { TestBed } from '@angular/core/testing';

import { WalletConnect } from './wallet-connect.service';

describe('WalletConnect', () => {
  let service: WalletConnect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletConnect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
