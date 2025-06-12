import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>();
}
