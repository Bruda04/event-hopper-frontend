import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupProductManagementComponent } from './pup-product-management.component';

describe('PupProductManagementComponent', () => {
  let component: PupProductManagementComponent;
  let fixture: ComponentFixture<PupProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupProductManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
