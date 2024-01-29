import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';
import {HttpClient} from "@angular/common/http";

xdescribe('ReportService', () => {
  let service: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClient ]
    });
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
