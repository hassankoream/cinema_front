import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullShowCastComponent } from './full-show-cast.component';

describe('FullShowCastComponent', () => {
  let component: FullShowCastComponent;
  let fixture: ComponentFixture<FullShowCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullShowCastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullShowCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
