import { inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, startWith, map } from 'rxjs';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly _platformService = inject(PlatformService);

  get isMobileSignal(): Signal<boolean | undefined> {
    const win = this._platformService.window;
    if (!win) {
      return signal<boolean | undefined>(undefined); // Empty fallback
    }

    return toSignal(
      fromEvent(win, 'resize').pipe(
        startWith(null),
        map(() => win.innerWidth <= 992),
      ),
    );
  }
}
