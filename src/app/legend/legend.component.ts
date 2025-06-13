import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, NgClass } from '@angular/common';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-legend',
  imports: [DatePipe, NgClass],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  private readonly _carService = inject(CarService);
  private readonly _layoutService = inject(LayoutService);

  readonly isMobileSignal = this._layoutService.isMobileSignal;

  readonly dateDetailsSignal = toSignal(this._carService.getDates$());
}
