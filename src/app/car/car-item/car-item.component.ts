import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { VendorCarComponent } from '../../vendor/vendor-car/vendor-car.component';
import { ActivatedRoute } from '@angular/router';
import { VehAvail, Vendor } from '../_model/car.model';
import { ButtonComponent } from '../../button/button.component';
import { NgClass } from '@angular/common';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss',
  imports: [VendorCarComponent, ButtonComponent, NgClass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarItemComponent {
  private readonly _layoutService = inject(LayoutService);

  readonly isMobileSignal = this._layoutService.isMobileSignal;

  readonly car: VehAvail & { vendor: Vendor } =
    inject(ActivatedRoute).snapshot.data['carResolver'][0];
}
