import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReedComponent } from './reed.component';

describe('ReedComponent', () => {
  let component: ReedComponent;
  let fixture: ComponentFixture<ReedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
