import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { VendorCarComponent } from '../../vendor/vendor-car/vendor-car.component';
import { ActivatedRoute } from '@angular/router';
import { VehAvail, Vendor } from '../_model/car.model';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss',
  imports: [VendorCarComponent, ButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarItemComponent {
  readonly car: VehAvail & { vendor: Vendor } =
    inject(ActivatedRoute).snapshot.data['carResolver'][0];
}
