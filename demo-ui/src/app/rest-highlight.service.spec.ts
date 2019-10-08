import { TestBed } from '@angular/core/testing';

import { RestHighlightService } from './rest-highlight.service';

describe('RestHighlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestHighlightService = TestBed.get(RestHighlightService);
    expect(service).toBeTruthy();
  });
});
