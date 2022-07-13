import { TestBed } from '@angular/core/testing';

import { GlobalRequestInterceptor } from './global-request.interceptor';

describe('GlobalRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalRequestInterceptor = TestBed.inject(GlobalRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
