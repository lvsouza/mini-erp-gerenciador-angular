import { TestBed } from '@angular/core/testing';

import { PostDatabaseService } from './post-database.service';

describe('PostDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostDatabaseService = TestBed.get(PostDatabaseService);
    expect(service).toBeTruthy();
  });
});
