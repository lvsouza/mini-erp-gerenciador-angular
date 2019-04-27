import { TestBed } from '@angular/core/testing';

import { DeleteDadosDatabaseService } from './delete-dados-database.service';

describe('DeleteDadosDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteDadosDatabaseService = TestBed.get(DeleteDadosDatabaseService);
    expect(service).toBeTruthy();
  });
});
