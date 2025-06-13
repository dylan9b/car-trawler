import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, startWith, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  get localStorage(): Storage | null {
    return this.isBrowser ? localStorage : null;
  }

  get isMobileSignal(): Signal<boolean | undefined> {
    return toSignal(
      fromEvent(window, 'resize').pipe(
        startWith(null),
        map(() => window.innerWidth <= 992),
      ),
    );
  }
}
