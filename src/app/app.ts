import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarService } from './services/car.service';
import { PlatformService } from './services/platform.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  providers: [CarService, PlatformService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'car-trawler';
}
