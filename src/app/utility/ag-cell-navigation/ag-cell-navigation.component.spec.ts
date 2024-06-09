import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCellNavigationComponent } from './ag-cell-navigation.component';

describe('AgCellNavigationComponent', () => {
  let component: AgCellNavigationComponent;
  let fixture: ComponentFixture<AgCellNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgCellNavigationComponent]
    });
    fixture = TestBed.createComponent(AgCellNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
