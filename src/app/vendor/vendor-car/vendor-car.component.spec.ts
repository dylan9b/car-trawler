import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorCarComponent } from './vendor-car.component';
import { VehAvail, Vendor } from '../../car/_model/car.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('VendorCarComponent', () => {
  let component: VendorCarComponent;
  let fixture: ComponentFixture<VendorCarComponent>;

  const mockCar = {
    vehicle: {
      baggageQuantity: '2',
      doorCount: '4',
      fuelType: 'Petrol',
      passengerQuantity: '5',
      airConditionInd: true,
      transmissionType: 'Automatic',
      code: 'XYZ',
      vehMakeModel: { name: 'Test Car' },
    },
    totalCharge: { estimatedTotalAmount: '123.45' },
    vendor: {
      name: 'TestVendor',
    },
  } as unknown as VehAvail & { vendor: Vendor };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCarComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCarComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('carDetails', mockCar);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute correct details from carDetails input', () => {
    const details = component.detailsSignal();

    expect(details).toEqual([
      { icon: 'bag', value: '2' },
      { icon: 'door', value: '4' },
      { icon: 'fuel', value: 'Petrol' },
      { icon: 'person', value: '5' },
      { icon: 'snowflake', value: 'Yes' },
      { icon: 'transmission', value: 'Automatic' },
    ]);
  });
});
