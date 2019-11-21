import { TestBed } from '@angular/core/testing';

import { CompBrnhService } from './comp-brnh.service';

describe('CompBrnhService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompBrnhService = TestBed.get(CompBrnhService);
    expect(service).toBeTruthy();
  });
});
