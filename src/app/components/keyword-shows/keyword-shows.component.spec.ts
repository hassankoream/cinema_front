import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordShowsComponent } from './keyword-shows.component';

describe('KeywordShowsComponent', () => {
  let component: KeywordShowsComponent;
  let fixture: ComponentFixture<KeywordShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordShowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeywordShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
