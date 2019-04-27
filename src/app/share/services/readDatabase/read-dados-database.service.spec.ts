import { TestBed } from '@angular/core/testing';

import { ReadDadosDatabaseService } from './read-dados-database.service';

describe('ReadDadosDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadDadosDatabaseService = TestBed.get(ReadDadosDatabaseService);
    expect(service).toBeTruthy();
  });
});
