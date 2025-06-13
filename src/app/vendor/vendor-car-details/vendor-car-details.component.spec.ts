import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCarDetailsComponent } from './vendor-car-details.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VendorCarDetailModel } from './_model/vendor-car-detail.model';

describe('VendorCarDetailsComponent', () => {
  let component: VendorCarDetailsComponent;
  let fixture: ComponentFixture<VendorCarDetailsComponent>;

  const mockDetails: VendorCarDetailModel[] = [
    { icon: 'bag', value: '2' },
    { icon: 'door', value: '4' },
    { icon: 'fuel', value: 'Petrol' },
    { icon: 'person', value: '5' },
    { icon: 'snowflake', value: 'Yes' },
    { icon: 'transmission', value: 'Automatic' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCarDetailsComponent, RouterModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCarDetailsComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('details', mockDetails);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have details input set with mockDetails', () => {
    expect(component.details()).toEqual(mockDetails);
  });

  it('should update details when input changes', () => {
    const newDetails: VendorCarDetailModel[] = [
      { icon: 'new-icon', value: 'new-value' },
    ];
    fixture.componentRef.setInput('details', newDetails);
    fixture.detectChanges();
    expect(component.details()).toEqual(newDetails);
  });
});
