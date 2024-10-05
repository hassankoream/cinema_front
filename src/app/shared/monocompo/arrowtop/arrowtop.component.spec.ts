import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowtopComponent } from './arrowtop.component';

describe('ArrowtopComponent', () => {
  let component: ArrowtopComponent;
  let fixture: ComponentFixture<ArrowtopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowtopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowtopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
