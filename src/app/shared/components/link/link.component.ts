import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  linkTo = input.required<string>();
  activeClasses = input<string>('');
  text = input<string>();
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
