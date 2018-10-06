import { TestBed, inject } from '@angular/core/testing';

import { QrcodereaderService } from './qrcodereader.service';

describe('QrcodereaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrcodereaderService]
    });
  });

  it('should be created', inject([QrcodereaderService], (service: QrcodereaderService) => {
    expect(service).toBeTruthy();
  }));
});
