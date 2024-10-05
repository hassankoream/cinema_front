import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDBLayoutComponent } from './mdb-layout.component';

describe('MDBLayoutComponent', () => {
  let component: MDBLayoutComponent;
  let fixture: ComponentFixture<MDBLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDBLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MDBLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
