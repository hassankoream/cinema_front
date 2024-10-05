import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedLayoutComponent } from './linked-layout.component';

describe('LinkedLayoutComponent', () => {
  let component: LinkedLayoutComponent;
  let fixture: ComponentFixture<LinkedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
