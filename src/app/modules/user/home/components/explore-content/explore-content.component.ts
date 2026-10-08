import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-explore-content',
  imports: [RouterLink, IconComponent],
  templateUrl: './explore-content.component.html',
  styleUrl: './explore-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreContentComponent {
  linkTo = input<string>();
  label = input.required<string>();

  isHover = signal<boolean>(false);
}
