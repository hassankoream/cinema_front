import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasLoggedGuard } from './has-logged.guard';

describe('hasLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
