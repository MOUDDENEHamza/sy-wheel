import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeAnimationComponent } from './coffee-animation.component';

describe('CoffeeAnimationComponent', () => {
  let component: CoffeeAnimationComponent;
  let fixture: ComponentFixture<CoffeeAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeeAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
