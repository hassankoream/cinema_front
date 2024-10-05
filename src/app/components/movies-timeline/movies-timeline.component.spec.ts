import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTimelineComponent } from './movies-timeline.component';

describe('MoviesTimelineComponent', () => {
  let component: MoviesTimelineComponent;
  let fixture: ComponentFixture<MoviesTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
