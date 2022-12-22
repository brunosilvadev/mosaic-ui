import { TestBed } from '@angular/core/testing';

import { MosaicService } from './mosaic.service';

describe('MosaicService', () => {
  let service: MosaicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MosaicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
