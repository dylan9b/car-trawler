import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCarComponent } from './vendor-car.component';

describe('VendorCarComponent', () => {
  let component: VendorCarComponent;
  let fixture: ComponentFixture<VendorCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
