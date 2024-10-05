import { TestBed } from '@angular/core/testing';

import { DiscoverShowsService } from './discover-shows.service';

describe('DiscoverShowsService', () => {
  let service: DiscoverShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
