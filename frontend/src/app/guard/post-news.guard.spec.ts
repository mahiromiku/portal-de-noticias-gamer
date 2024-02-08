import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postNewsGuard } from './post-news.guard';

describe('postNewsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postNewsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
