import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesShowsComponent } from './favourites-shows.component';

describe('FavouritesShowsComponent', () => {
  let component: FavouritesShowsComponent;
  let fixture: ComponentFixture<FavouritesShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesShowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritesShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
