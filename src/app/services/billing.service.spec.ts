import { TestBed } from '@angular/core/testing';

import { BillingService } from './billing.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BillingService', () => {
  let service: BillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BillingService);

  });

  it('Bebe de crearse', () => {
    expect(service).toBeTruthy();
  });

});
