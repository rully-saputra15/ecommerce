import { TestBed } from '@angular/core/testing';

import { KeranjangService } from './keranjang.service';

describe('KeranjangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeranjangService = TestBed.get(KeranjangService);
    expect(service).toBeTruthy();
  });
});
