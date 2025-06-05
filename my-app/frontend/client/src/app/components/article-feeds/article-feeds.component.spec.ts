import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFeedsComponent } from './article-feeds.component';

describe('ArticleFeedsComponent', () => {
  let component: ArticleFeedsComponent;
  let fixture: ComponentFixture<ArticleFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFeedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
