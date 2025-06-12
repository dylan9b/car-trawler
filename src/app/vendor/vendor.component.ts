import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { VehVendorAvail } from '../car/_model/car.model';
import { VendorCarComponent } from './vendor-car/vendor-car.component';

@Component({
  selector: 'app-vendor',
  imports: [VendorCarComponent],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorComponent {
  readonly vendorAvailable = input.required<VehVendorAvail>();

  readonly vendorName = computed(() =>
    this.vendorAvailable().vendor.name.toLocaleLowerCase()
  );
}
