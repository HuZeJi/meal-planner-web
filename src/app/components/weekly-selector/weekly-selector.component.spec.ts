import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySelectorComponent } from './weekly-selector.component';

describe('WeeklySelectorComponent', () => {
  let component: WeeklySelectorComponent;
  let fixture: ComponentFixture<WeeklySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklySelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
