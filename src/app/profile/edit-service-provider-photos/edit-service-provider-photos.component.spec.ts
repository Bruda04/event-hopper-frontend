import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceProviderPhotosComponent } from './edit-service-provider-photos.component';

describe('EditServiceProviderPhotosComponent', () => {
  let component: EditServiceProviderPhotosComponent;
  let fixture: ComponentFixture<EditServiceProviderPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditServiceProviderPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceProviderPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
