import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockReportDialogComponent } from './block-report-dialog.component';

describe('BlockReportDialogComponent', () => {
  let component: BlockReportDialogComponent;
  let fixture: ComponentFixture<BlockReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
