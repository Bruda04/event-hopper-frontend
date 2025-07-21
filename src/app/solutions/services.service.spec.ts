import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicesService } from './services.service';
import { environment } from '../../env/envirements';
import { CreateServiceDTO } from '../shared/dto/solutions/createServiceDTO.model';

describe('ServicesService', () => {
  let service: ServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicesService]
    });

    service = TestBed.inject(ServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send correct data when adding a service', () => {
    const mockService: CreateServiceDTO = {
      name: 'Test Service',
      description: 'A service for testing',
      basePrice: 100,
      discount: 10,
      finalPrice: 90,
      pictures: [],
      categoryId: 'cat123',
      eventTypesIds: ['event1'],
      autoAccept: true,
      available: true,
      visible: true,
      durationMinutes: 60,
      reservationWindowDays: 2,
      cancellationWindowDays: 1
    };

    service.add(mockService).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiHost}/services`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockService);

    req.flush({ success: true });
  });
});
