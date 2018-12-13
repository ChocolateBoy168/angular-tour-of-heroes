import { TestBed } from '@angular/core/testing';

import { MyInMemoryDataService } from './my-in-memory-data.service';

describe('MyInMemoryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyInMemoryDataService = TestBed.get(MyInMemoryDataService);
    expect(service).toBeTruthy();
  });
});
