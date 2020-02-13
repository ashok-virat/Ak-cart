import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCartComponent } from './admin-cart.component';

describe('AdminCartComponent', () => {
  let component: AdminCartComponent;
  let fixture: ComponentFixture<AdminCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
