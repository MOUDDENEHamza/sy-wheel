import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelComponentComponent } from './wheel-component.component';

describe('WheelComponentComponent', () => {
  let component: WheelComponentComponent;
  let fixture: ComponentFixture<WheelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WheelComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
