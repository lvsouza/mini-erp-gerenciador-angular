import { TestBed } from '@angular/core/testing';

import { UpdateDatabaseService } from './update-database.service';

describe('UpdateDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateDatabaseService = TestBed.get(UpdateDatabaseService);
    expect(service).toBeTruthy();
  });
});
