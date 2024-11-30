import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskAnimationComponent } from './desk-animation.component';

describe('DeskAnimationComponent', () => {
  let component: DeskAnimationComponent;
  let fixture: ComponentFixture<DeskAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeskAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
