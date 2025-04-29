import { TestBed } from '@angular/core/testing';

import { BlockingService } from './blocking.service';

describe('BlockingService', () => {
  let service: BlockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
