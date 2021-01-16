import { TestBed } from '@angular/core/testing';

import { CrudDemoService } from './crud-demo.service';

describe('CrudDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudDemoService = TestBed.get(CrudDemoService);
    expect(service).toBeTruthy();
  });
});
