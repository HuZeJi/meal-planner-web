import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealNavComponent } from './meal-nav.component';

describe('MealNavComponent', () => {
  let component: MealNavComponent;
  let fixture: ComponentFixture<MealNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
