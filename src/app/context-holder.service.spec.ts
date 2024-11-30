import { TestBed } from '@angular/core/testing';

import { ContextHolderService } from './context-holder.service';

describe('ContextHolderService', () => {
  let service: ContextHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
