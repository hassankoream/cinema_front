import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMovieComponent } from './social-movie.component';

describe('SocialMovieComponent', () => {
  let component: SocialMovieComponent;
  let fixture: ComponentFixture<SocialMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
