import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUPServiceManagementComponent } from './pupservice-management.component';

describe('PUPServiceManagementComponent', () => {
  let component: PUPServiceManagementComponent;
  let fixture: ComponentFixture<PUPServiceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PUPServiceManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUPServiceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
