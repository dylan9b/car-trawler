import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VendorCarDetailModel } from './_model/vendor-car-detail.model';

@Component({
  selector: 'app-vendor-car-details',
  templateUrl: './vendor-car-details.component.html',
  styleUrl: './vendor-car-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorCarDetailsComponent {
  readonly details = input.required<VendorCarDetailModel[]>();
}
