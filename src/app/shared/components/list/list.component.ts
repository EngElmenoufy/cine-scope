import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-list',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private readonly renderer = inject(Renderer2);

  label = input.required<string>();
  isClicked = signal<boolean>(false);
  isHovered = signal<boolean>(false);

  constructor() {
    effect((onCleanup) => {
      if (!this.isClicked()) {
        return;
      }

      const unListen = this.renderer.listen(
        'document',
        'click',
        (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (!target.closest('app-list') || target.closest('app-link')) {
            this.isClicked.set(false);
          }
        },
      );

      onCleanup(() => {
        unListen();
      });
    });
  }

  toggleClick(): void {
    this.isClicked.update((value) => !value);
  }
}
