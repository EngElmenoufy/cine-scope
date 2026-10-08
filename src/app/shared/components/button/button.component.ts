import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  paddingX = input<string>('1rem');
  paddingY = input<string>('0.5rem');
  borderRadius = input<string>('0.5rem');
  bgColor = input<string>('transparent');
  bgColorHover = input<string>('transparent');
  textColor = input<string>('inherit');
  textColorHover = input<string>('inherit');
  otherClasses = input<string>('');

  isHovering = signal<boolean>(false);
}
