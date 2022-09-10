import { TestBed } from '@angular/core/testing';

import { LnpayService } from './lnpay.service';

describe('LnpayService', () => {
  let service: LnpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LnpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
