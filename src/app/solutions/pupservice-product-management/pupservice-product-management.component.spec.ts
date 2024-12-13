import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUPServiceProductManagementComponent } from './pupservice-product-management.component';

describe('PUPServiceProductManagementComponent', () => {
  let component: PUPServiceProductManagementComponent;
  let fixture: ComponentFixture<PUPServiceProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PUPServiceProductManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUPServiceProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
