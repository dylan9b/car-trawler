import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCarDetailsComponent } from './vendor-car-details.component';

describe('VendorCarDetailsComponent', () => {
  let component: VendorCarDetailsComponent;
  let fixture: ComponentFixture<VendorCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCarDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
