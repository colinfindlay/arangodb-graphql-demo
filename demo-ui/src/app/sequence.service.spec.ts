import { TestBed } from '@angular/core/testing';

import { SequenceService } from './sequence.service';

describe('SequenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SequenceService = TestBed.get(SequenceService);
    expect(service).toBeTruthy();
  });
});
