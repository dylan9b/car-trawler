import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarItemComponent } from './car-item.component';
import { ActivatedRoute } from '@angular/router';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { VehAvail, Vendor } from '../_model/car.model';
import { LayoutService } from '../../services/layout.service';

describe('CarItemComponent', () => {
  let component: CarItemComponent;
  let fixture: ComponentFixture<CarItemComponent>;

  const mockCar = {
    vehicle: { code: 'XYZ', vehMakeModel: { name: 'Test Car' } },
    totalCharge: { estimatedTotalAmount: '123.45' },
    vendor: { name: 'test-vendor' },
  } as unknown as VehAvail & { vendor: Vendor };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                carResolver: [mockCar],
              },
            },
          },
        },
        {
          provide: LayoutService,
          useValue: {
            isMobileSignal: signal(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set car from route data', () => {
    expect(component.car).toEqual(mockCar);
  });

  it('should set isMobileSignal from LayoutService', () => {
    expect(component.isMobileSignal()).toBeFalse();
  });
});
