import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-legend',
  imports: [DatePipe],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  private readonly _carService = inject(CarService);

  readonly dateDetailsSignal = toSignal(this._carService.getDates$());
}
