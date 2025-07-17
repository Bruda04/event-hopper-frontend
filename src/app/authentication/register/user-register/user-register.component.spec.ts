import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegisterComponent } from './user-register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';  // <-- Added
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock services
import { RegistrationService } from '../../services/registration/registration.service';
import { InvitationService } from '../../../invitation/invitation.service';
import { ImageServiceService } from '../../../shared/services/image-service.service';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegisterComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,            // <-- Added here
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ invitationId: 'mock-invite-id' }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: InvitationService,
          useValue: {
            getInvitation: jasmine
              .createSpy('getInvitation')
              .and.returnValue(of({ targetEmail: 'test@example.com' })),
          },
        },
        {
          provide: RegistrationService,
          useValue: {
            registerAuthenticatedUser: jasmine
              .createSpy('registerAuthenticatedUser')
              .and.returnValue(of({})),
          },
        },
        {
          provide: ImageServiceService,
          useValue: {
            uploadImage: jasmine
              .createSpy('uploadImage')
              .and.returnValue(of('https://fake.image')),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
