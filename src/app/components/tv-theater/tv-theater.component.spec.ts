import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvTheaterComponent } from './tv-theater.component';

describe('TvTheaterComponent', () => {
  let component: TvTheaterComponent;
  let fixture: ComponentFixture<TvTheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvTheaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
