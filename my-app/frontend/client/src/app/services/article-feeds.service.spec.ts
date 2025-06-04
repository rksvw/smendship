import { TestBed } from '@angular/core/testing';

import { ArticleFeedsService } from './article-feeds.service';

describe('ArticleFeedsService', () => {
  let service: ArticleFeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleFeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
