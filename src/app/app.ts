import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  providers: [CarService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'car-trawler';
}
