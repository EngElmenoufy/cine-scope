import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name = input.required<string>();
  width = input<string>('2rem');
  height = input<string>('2rem');
  color = input<string>('#0a0a10');
}
