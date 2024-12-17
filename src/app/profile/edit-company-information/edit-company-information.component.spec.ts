import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyInformationComponent } from './edit-company-information.component';

describe('EditCompanyInformationComponent', () => {
  let component: EditCompanyInformationComponent;
  let fixture: ComponentFixture<EditCompanyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCompanyInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCompanyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
