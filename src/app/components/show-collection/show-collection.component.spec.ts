import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCollectionComponent } from './show-collection.component';

describe('ShowCollectionComponent', () => {
  let component: ShowCollectionComponent;
  let fixture: ComponentFixture<ShowCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
