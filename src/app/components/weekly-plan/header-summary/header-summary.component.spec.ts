import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSummaryComponent } from './header-summary.component';

describe('HeaderSummaryComponent', () => {
  let component: HeaderSummaryComponent;
  let fixture: ComponentFixture<HeaderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
