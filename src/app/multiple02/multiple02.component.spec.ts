import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Multiple02Component } from './multiple02.component';

describe('Multiple02Component', () => {
  let component: Multiple02Component;
  let fixture: ComponentFixture<Multiple02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Multiple02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Multiple02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
