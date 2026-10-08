import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  effect,
  input,
  signal,
  viewChild,
  ElementRef,
  inject,
  NgZone,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-slider',
  imports: [IconComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnDestroy {
  hasScrollbar = input<boolean>(true);
  isCentered = input<boolean>(false);

  track = viewChild<ElementRef<HTMLElement>>('track');
  startSentinel = viewChild<ElementRef<HTMLElement>>('startSentinel');
  endSentinel = viewChild<ElementRef<HTMLElement>>('endSentinel');

  isBtnLeftDisabled = signal(true);
  isBtnRightDisabled = signal(false);
  hasScroll = signal(false);

  private readonly ngZone = inject(NgZone);
  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect((onCleanup) => {
      const trackEl = this.track()?.nativeElement;
      const startEl = this.startSentinel()?.nativeElement;
      const endEl = this.endSentinel()?.nativeElement;
      if (!trackEl || !startEl || !endEl) return;

      this.setupObservers(trackEl, startEl, endEl);

      onCleanup(() => {
        this.destroyObservers();
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyObservers();
    // this.intersectionObserver?.disconnect();
    // this.resizeObserver?.disconnect();
  }

  private setupObservers(
    track: HTMLElement,
    start: HTMLElement,
    end: HTMLElement,
  ): void {
    // this.isRtl = getComputedStyle(track).direction === 'rtl';

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === start) {
            const disabled = entry.isIntersecting;

            if (this.isBtnLeftDisabled() !== disabled) {
              this.ngZone.run(() => {
                this.isBtnLeftDisabled.set(disabled);
              });
            }
          }

          if (entry.target === end) {
            const disabled = entry.isIntersecting;

            if (this.isBtnRightDisabled() !== disabled) {
              this.ngZone.run(() => {
                this.isBtnRightDisabled.set(disabled);
              });
            }
          }
        }
      },
      {
        root: track,
        threshold: 1,
      },
    );

    this.intersectionObserver.observe(start);
    this.intersectionObserver.observe(end);

    this.resizeObserver = new ResizeObserver(() => {
      const hasScroll = track.scrollWidth > track.clientWidth;

      if (this.hasScroll() !== hasScroll) {
        this.ngZone.run(() => {
          this.hasScroll.set(hasScroll);
        });
      }
    });

    this.resizeObserver.observe(track);
  }

  private destroyObservers(): void {
    this.intersectionObserver?.disconnect();
    this.resizeObserver?.disconnect();

    this.intersectionObserver = undefined;
    this.resizeObserver = undefined;
  }

  scrollLeft(): void {
    this.scrollByDirection(-1);
  }

  scrollRight(): void {
    this.scrollByDirection(1);
  }

  private scrollByDirection(direction: 1 | -1): void {
    const track = this.track()?.nativeElement;

    if (!track) {
      return;
    }

    const amount = (track.clientWidth - 200) * direction;

    track.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
  }
}
