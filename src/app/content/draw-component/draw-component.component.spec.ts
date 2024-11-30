import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawComponentComponent } from './draw-component.component';

describe('DrawComponentComponent', () => {
  let component: DrawComponentComponent;
  let fixture: ComponentFixture<DrawComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
