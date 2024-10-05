import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonShowsComponent } from './person-shows.component';

describe('PersonShowsComponent', () => {
  let component: PersonShowsComponent;
  let fixture: ComponentFixture<PersonShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonShowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
