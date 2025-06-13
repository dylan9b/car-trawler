import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';
import { VendorCarComponent } from '../../vendor/vendor-car/vendor-car.component';
import { ButtonComponent } from '../../button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LegendComponent } from '../../legend/legend.component';
import { CarService } from '../../services/car.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-car-list',
  imports: [VendorCarComponent, ButtonComponent, LegendComponent, RouterLink],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarListComponent {
  private readonly _carService = inject(CarService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);

  readonly carsSignal = toSignal(
    this._route.data.pipe(map((data) => data['carResolver'])),
  );

  readonly sortDirectionSignal = this._carService.sortDirectionSignal;

  readonly sortDirectionImageSignal = computed(() => {
    return this.sortDirectionSignal() === 'ASC'
      ? 'angle-up-white'
      : 'angle-down-white';
  });

  constructor() {
    this.subscribeRouteParams();
  }

  private subscribeRouteParams(): void {
    this._route.queryParamMap
      .pipe(
        map((params) => {
          return params.get('sortPrice');
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((sortDir: string | null) => {
        this._carService.sortDirectionSignal.update(() =>
          sortDir === 'ASC' || sortDir === 'DESC'
            ? (sortDir as 'ASC' | 'DESC')
            : 'ASC',
        );
      });
  }

  sortByPrice(): void {
    this._carService.sortDirectionSignal.update((dir) =>
      dir === 'ASC' ? 'DESC' : 'ASC',
    );

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        sortPrice: this._carService.sortDirectionSignal(),
      },
      queryParamsHandling: 'merge',
    });
  }
}
