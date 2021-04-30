import { TestBed } from '@angular/core/testing';

import { VlilleService } from './vlille.service';

describe('VlilleService', () => {
  let service: VlilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VlilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
