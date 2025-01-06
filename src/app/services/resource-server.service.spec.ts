import { TestBed } from '@angular/core/testing';

import { ResourceServerService } from './resource-server.service';

describe('ResourceServerService', () => {
  let service: ResourceServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
