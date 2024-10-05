import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerSliderComponent } from './trailer-slider.component';

describe('TrailerSliderComponent', () => {
  let component: TrailerSliderComponent;
  let fixture: ComponentFixture<TrailerSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrailerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
