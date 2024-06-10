import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFilterComponent } from './drop-down-filter.component';

describe('DropDownFilterComponent', () => {
  let component: DropDownFilterComponent;
  let fixture: ComponentFixture<DropDownFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownFilterComponent]
    });
    fixture = TestBed.createComponent(DropDownFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
