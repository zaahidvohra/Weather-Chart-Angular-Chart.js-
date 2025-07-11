import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultipleComponent } from './dynamic-multiple.component';

describe('DynamicMultipleComponent', () => {
  let component: DynamicMultipleComponent;
  let fixture: ComponentFixture<DynamicMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicMultipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
