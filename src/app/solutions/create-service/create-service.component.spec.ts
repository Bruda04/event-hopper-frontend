import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateServiceComponent } from './create-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageServiceService } from '../../shared/services/image-service.service';
import { of, throwError } from 'rxjs';
import { CategoryDTO } from '../../shared/dto/categories/categoryDTO.model';
import { SimpleEventTypeDTO } from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


describe('CreateServiceComponent', () => {
    let component: CreateServiceComponent;
    let fixture: ComponentFixture<CreateServiceComponent>;
    let mockImageService: jasmine.SpyObj<ImageServiceService>;
    let dialogRef: jasmine.SpyObj<MatDialogRef<CreateServiceComponent>>;

    const fakeCategories: CategoryDTO[] = [
        {
            id: 'category1id',
            name: 'Category 1',
            eventTypes: [
                {id: 'eventType1id', name: 'Event Type One'} as SimpleEventTypeDTO
            ],
            description: 'Category 1 Description',
            status: 'active',
            deletable: false
        }
    ];

    beforeEach(async () => {
        mockImageService = jasmine.createSpyObj('ImageServiceService', ['uploadImage']);
        dialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'dismiss']);

        await TestBed.configureTestingModule({
            declarations: [CreateServiceComponent],
            imports: [ReactiveFormsModule,
                BrowserAnimationsModule,
                MatDialogModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatCheckboxModule,
                MatRadioModule,
                MatIconModule,
                MatButtonModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: fakeCategories },
                { provide: MatDialogRef, useValue: dialogRef },
                { provide: ImageServiceService, useValue: mockImageService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should initialize form controls with defaults', () => {
        const form = component.createServiceForm;
        expect(form.get('name')?.value).toBe('');
        expect(form.get('discount')?.value).toBeNull();
        expect(form.get('acceptance')?.value).toBe('auto');
    });

    it('should update filteredEventTypes when category changes', fakeAsync(() => {
        component.createServiceForm.get('category')?.setValue('category1id');
        tick();
        expect(component.filteredEventTypes.length).toBe(1);
        expect(component.filteredEventTypes[0].id).toBe('eventType1id');
    }));

    it('should mark invalid when create() called with missing required', () => {
        component.create();
        expect(component.createServiceForm.invalid).toBeTrue();
    });

    it('should call dialogRef.close with CreateServiceDTO when form and images are valid', fakeAsync(() => {
        // Fill form
        component.createServiceForm.setValue({
            name: 'Test Service',
            description: 'Desc',
            basePrice: 100,
            discount: 10,
            category: 'category1id',
            eventType: ['eventType1id'],
            acceptance: 'auto',
            available: true,
            visible: true,
            duration: 60,
            reservationWindow: 5,
            cancellationWindow: 2,
            categoryName: ''
        });

        // Setup image
        const fakeFile = new File(['abc'], 'test.png', { type: 'image/png' });
        component.imageUploads = [fakeFile];
        component.imageUrls = ['fake-url'];
        mockImageService.uploadImage.and.returnValue(of('1231231212.png'));

        component.create();
        tick();

        expect(mockImageService.uploadImage).toHaveBeenCalledTimes(1);
        expect(dialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({
            name: 'Test Service',
            pictures: ['1231231212.png'],
            finalPrice: 10
        }));
    }));

    it('should not close dialog when image upload fails', fakeAsync(() => {
        component.createServiceForm.patchValue({
            name: 'Test',
            description: 'desc',
            basePrice: 50,
            discount: 0,
            category: 'category1id',
            eventType: ['eventType1id'],
            acceptance: 'manual',
            available: true,
            visible: true,
            duration: 30,
            reservationWindow: 1,
            cancellationWindow: 1,
            categoryName: ''
        });
        const fakeFile = new File(['a'], 'f.png', { type: 'image/png' });
        component.imageUploads = [fakeFile];
        component.imageUrls = ['url'];
        mockImageService.uploadImage.and.returnValue(throwError(() => new Error('fail')));

        spyOn(console, 'error');
        component.create();
        tick();

        expect(dialogRef.close).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('Error uploading images', jasmine.any(Error));
    }));

    it('should update image arrays on file selection', () => {
        const fakeFile = new File(['x'], 'x.jpg', { type: 'image/jpeg' });
        const fakeEvent = { target: { files: [fakeFile] } } as any;
        component.onServiceImageSelected(fakeEvent);
        expect(component.imageUploads.length).toBe(1);
        expect(component.imageUrls.length).toBe(1);
    });

    it('should remove image properly via clearServiceImage', () => {
        component.imageUploads = ['A', 'B'] as any;
        component.imageUrls = ['urlA', 'urlB'];
        component.clearServiceImage(0);
        expect(component.imageUrls).toEqual(['urlB']);
    });

  it('should set errors when both category and categoryName are empty', () => {
    const categoryControl = component.createServiceForm.get('category');
    const categoryNameControl = component.createServiceForm.get('categoryName');

    categoryControl?.setValue(null);
    categoryNameControl?.setValue(null);

    const markAllAsTouchedSpy = spyOn(component.createServiceForm, 'markAllAsTouched');

    component.create();

    expect(categoryControl?.errors).toEqual({ required: true });
    expect(categoryNameControl?.errors).toEqual({ required: true });

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
});
