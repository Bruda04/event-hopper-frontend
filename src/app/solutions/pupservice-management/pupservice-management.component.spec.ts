import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PUPServiceManagementComponent } from './pupservice-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {of, Subject, throwError} from 'rxjs';
import { ServicesService } from '../services.service';
import { CategoriesService } from '../../admin-dashboard/categories/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateServiceDTO } from '../../shared/dto/solutions/createServiceDTO.model';
import { CategoryDTO } from '../../shared/dto/categories/categoryDTO.model';
import { CreatedCategorySuggestionDTO } from '../../shared/dto/categories/createdCategorySuggestionDTO.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


describe('PUPServiceManagementComponent', () => {
  let component: PUPServiceManagementComponent;
  let fixture: ComponentFixture<PUPServiceManagementComponent>;
  let serviceService: jasmine.SpyObj<ServicesService>;
  let categoriesService: jasmine.SpyObj<CategoriesService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PUPServiceManagementComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSortModule
      ],
      providers: [
        { provide: ServicesService, useValue: jasmine.createSpyObj('ServicesService', ['add', 'getAllForManagement']) },
        { provide: CategoriesService, useValue: jasmine.createSpyObj('CategoriesService', ['makeSuggestion', 'getApproved']) },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PUPServiceManagementComponent);
    component = fixture.componentInstance;

    serviceService = TestBed.inject(ServicesService) as jasmine.SpyObj<ServicesService>;
    categoriesService = TestBed.inject(CategoriesService) as jasmine.SpyObj<CategoriesService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    component.sort = {
      sortChange: new Subject()
    } as any;

    component.paginator = {
      page: 0,
      pageSize: 4,
      pageIndex: 0,
      length: 0,
      pageChange: new Subject()
    } as any;

    serviceService.getAllForManagement.and.returnValue(of({
      content: [],
      totalPages: 0,
      totalElements: 0
    }));

    categoriesService.getApproved.and.returnValue(of([
      { id: 'category1Id', name: 'Category 1', eventTypes: [], status: 'approved', description: 'Category 1 Description', deletable: false }
    ]));

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating service dialog', () => {
    it('should add service directly when category is approved', fakeAsync(() => {
      const mockService: CreateServiceDTO = {
        name: 'Test',
        description: 'desc',
        basePrice: 50,
        discount: 0,
        finalPrice: 50,
        pictures: [],
        categoryId: 'category1Id',
        eventTypesIds: ['eventType1Id'],
        autoAccept: false,
        available: true,
        visible: true,
        durationMinutes: 30,
        reservationWindowDays: 1,
        cancellationWindowDays: 1,
      };

      const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue(of(mockService));
      dialog.open.and.returnValue(dialogRefSpy);

      serviceService.add.and.returnValue(of({}));
      const loadSpy = spyOn(component, 'loadPagedEntities');
      const emitSpy = spyOn(component.serviceChanged, 'emit');

      component.add();
      tick();

      expect(dialog.open).toHaveBeenCalled();
      expect(serviceService.add).toHaveBeenCalledWith(mockService);
      expect(loadSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalled();
    }));

    it('should make suggestion and then add service if category is not found', fakeAsync(() => {
      const mockService: CreateServiceDTO = {
        name: 'Test',
        description: 'desc',
        basePrice: 50,
        discount: 0,
        finalPrice: 50,
        pictures: [],
        categoryId: 'Suggested',
        eventTypesIds: ['eventType1id'],
        autoAccept: false,
        available: true,
        visible: true,
        durationMinutes: 30,
        reservationWindowDays: 1,
        cancellationWindowDays: 1,
      };

      const suggestedCategory: CreatedCategorySuggestionDTO = {
        id: 'newCategoryId',
        name: 'Suggested',
        status: 'active',
      };

      const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue(of(mockService));
      dialog.open.and.returnValue(dialogRefSpy);

      categoriesService.makeSuggestion.and.returnValue(of(suggestedCategory));
      serviceService.add.and.returnValue(of({}));

      const loadSpy = spyOn(component, 'loadPagedEntities');
      const emitSpy = spyOn(component.serviceChanged, 'emit');

      component.add();
      tick();

      expect(categoriesService.makeSuggestion).toHaveBeenCalledWith('Suggested');
      expect(serviceService.add).toHaveBeenCalledWith({
        ...mockService,
        categoryId: 'newCategoryId'
      });
      expect(loadSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalled();
    }));

    it('should do nothing if dialog is closed without creating a service', fakeAsync(() => {
      const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue(of(null));
      dialog.open.and.returnValue(dialogRefSpy);

      component.add();
      tick();

      expect(dialog.open).toHaveBeenCalled();
      expect(serviceService.add).not.toHaveBeenCalled();
    }));

    it('should show error toast if service creation fails', fakeAsync(() => {
      const mockService: CreateServiceDTO = {
        name: 'Test',
        description: 'desc',
        basePrice: 50,
        discount: 0,
        finalPrice: 50,
        pictures: [],
        categoryId: 'category1Id',
        eventTypesIds: ['eventType1Id'],
        autoAccept: false,
        available: true,
        visible: true,
        durationMinutes: 30,
        reservationWindowDays: 1,
        cancellationWindowDays: 1,
      };

      const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue(of(mockService));
      dialog.open.and.returnValue(dialogRefSpy);

      serviceService.add.and.returnValue(throwError(() => ({ error: { message: 'Server error' } })));

      component.add();
      tick();

      expect(snackBar.open).toHaveBeenCalled();
      expect(snackBar.open.calls.mostRecent().args[0]).toBe('Error creating service: Server error');
    }));

    it('should show error toast if category suggestion fails', fakeAsync(() => {
    const mockService: CreateServiceDTO = {
      name: 'Test',
      description: 'desc',
      basePrice: 50,
      discount: 0,
      finalPrice: 50,
      pictures: [],
      categoryId: 'Suggested',
      eventTypesIds: ['eventType1id'],
      autoAccept: false,
      available: true,
      visible: true,
      durationMinutes: 30,
      reservationWindowDays: 1,
      cancellationWindowDays: 1,
    };

    const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(mockService));
    dialog.open.and.returnValue(dialogRefSpy);

    categoriesService.makeSuggestion.and.returnValue(throwError(() => ({ error: { message: 'Suggestion failed' } })));

    component.add();
    tick();

    expect(snackBar.open).toHaveBeenCalled();
    expect(snackBar.open.calls.mostRecent().args[0]).toBe('Error creating service: Suggestion failed');
  }));
  });
});
