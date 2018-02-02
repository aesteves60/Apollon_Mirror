import { TestBed, inject } from '@angular/core/testing';

import { MirrorService } from './mirror.service';

describe('MirrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MirrorService]
    });
  });

  it('should be created', inject([MirrorService], (service: MirrorService) => {
    expect(service).toBeTruthy();
  }));
});
