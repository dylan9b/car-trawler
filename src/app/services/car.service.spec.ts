import { TestBed } from '@angular/core/testing';
import { CarService } from './car.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  CarModel,
  VehAvail,
  VehRentalCore,
  Vendor,
} from '../car/_model/car.model';
import * as ApiUtil from './api.util';

describe('CarService', () => {
  let service: CarService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  // Minimal mock data matching CarModel shape for testing
  const mockCarData: CarModel = [
    {
      vehAvailRSCore: {
        vehRentalCore: {
          pickUpDateTime: '2020-03-22T10:00:00Z',
          returnDateTime: '2020-04-06T10:00:00Z',
          pickUpLocation: {
            name: 'Las Vegas - Airport',
          },
          returnLocation: {
            name: 'Las Vegas - Airport',
          },
        },
        vehVendorAvails: [
          {
            vendor: { name: 'VENDOR1', code: 'CODE1' },
            vehAvails: [
              {
                vehicle: {
                  code: 'A1',
                  airConditionInd: '',
                  transmissionType: '',
                  fuelType: '',
                  driveType: '',
                  passengerQuantity: '',
                  baggageQuantity: '',
                  codeContext: '',
                  doorCount: '',
                  vehMakeModel: {
                    name: '1',
                  },
                  pictureURL: '',
                },
                totalCharge: {
                  estimatedTotalAmount: '100',
                  currencyCode: '',
                  rateTotalAmount: '',
                },
                status: '',
              },
              {
                vehicle: {
                  code: 'A2',
                  airConditionInd: '',
                  transmissionType: '',
                  fuelType: '',
                  driveType: '',
                  passengerQuantity: '',
                  baggageQuantity: '',
                  codeContext: '',
                  doorCount: '',
                  vehMakeModel: {
                    name: '2',
                  },
                  pictureURL: '',
                },
                totalCharge: {
                  estimatedTotalAmount: '200',
                  currencyCode: '',
                  rateTotalAmount: '',
                },
                status: '',
              },
            ],
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        CarService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDates$', () => {
    it('should return vehRentalCore from data', (done) => {
      httpClientSpy.get.and.returnValue(of(mockCarData));

      service.getDates$().subscribe({
        next: (result) => {
          result = ApiUtil.sanitizeKeys(result) as VehRentalCore;
          expect(result).toEqual(mockCarData[0].vehAvailRSCore.vehRentalCore);
          done();
        },
      });
    });
  });

  describe('getCars$', () => {
    beforeEach(async () => {
      httpClientSpy.get.and.returnValue(of(mockCarData));
    });

    it('should flatten and map data correctly without filter', (done) => {
      service.getCars$().subscribe({
        next: (result) => {
          result = ApiUtil.sanitizeKeys(result) as (VehAvail & {
            vendor: Vendor;
          })[];
          expect(result.length).toBe(2);
          expect(result[0].vendor.name).toBe('vendor1');
          done();
        },
      });
    });

    it('should filter by vendorName and carCode', (done) => {
      service.getCars$({ vendorName: 'vendor1', carCode: 'A1' }).subscribe({
        next: (result) => {
          result = ApiUtil.sanitizeKeys(result) as (VehAvail & {
            vendor: Vendor;
          })[];
          expect(result.length).toBe(1);
          expect(result[0].vehicle.code).toBe('A1');
          expect(result[0].vendor.name).toBe('vendor1');
          done();
        },
      });
    });

    it('should return empty array if filter not matched', (done) => {
      service
        .getCars$({
          vendorName: 'nonexistent',
          carCode: 'A1',
        })
        .subscribe({
          next: (result) => {
            result = ApiUtil.sanitizeKeys(result) as (VehAvail & {
              vendor: Vendor;
            })[];
            expect(result.length).toBe(0);
            done();
          },
        });
    });

    it('should sort results ascending by default', (done) => {
      service.getCars$().subscribe({
        next: (result) => {
          result = ApiUtil.sanitizeKeys(result) as (VehAvail & {
            vendor: Vendor;
          })[];
          expect(result[0].totalCharge.estimatedTotalAmount).toBe('100');
          expect(result[1].totalCharge.estimatedTotalAmount).toBe('200');
          done();
        },
      });
    });

    it('should sort results descending if specified', (done) => {
      service.getCars$({ sortPrice: 'DESC' }).subscribe({
        next: (result) => {
          result = ApiUtil.sanitizeKeys(result) as (VehAvail & {
            vendor: Vendor;
          })[];
          expect(result[0].totalCharge.estimatedTotalAmount).toBe('200');
          expect(result[1].totalCharge.estimatedTotalAmount).toBe('100');
          done();
        },
      });
    });

    it('should catch error and return empty observable', (done) => {
      httpClientSpy.get.and.returnValue(throwError(() => new Error('fail')));

      service.getCars$().subscribe({
        next: (result) => {
          result = ApiUtil.sanitizeKeys(result) as (VehAvail & {
            vendor: Vendor;
          })[];
          expect(result).toEqual([]);
        },
        error: () => {
          fail('Expected error to be caught and handled');
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
