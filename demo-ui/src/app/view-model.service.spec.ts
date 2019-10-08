import { TestBed } from '@angular/core/testing';

import { ViewModelService } from './view-model.service';

describe('ViewModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewModelService = TestBed.get(ViewModelService);
    expect(service).toBeTruthy();
  });
});
