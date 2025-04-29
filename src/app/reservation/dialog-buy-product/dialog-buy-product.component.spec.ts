import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuyProductComponent } from './dialog-buy-product.component';

describe('DialogBuyProductComponent', () => {
  let component: DialogBuyProductComponent;
  let fixture: ComponentFixture<DialogBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogBuyProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
