import { DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Item } from '../../../../../core/models/item.interface';
import { MovieListsService } from '../../../../../core/services/movie-lists.service';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { CreateImageUrl } from '../../../../../shared/helpers/create-image-url';
import { HeroLoadingComponent } from '../hero-loading/hero-loading.component';

@Component({
  selector: 'app-hero',
  imports: [
    HeroLoadingComponent,
    DatePipe,
    DecimalPipe,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnDestroy {
  private readonly movieListsService = inject(MovieListsService);

  upcomingMovies = input<Item[]>();

  currentIndex = signal<number>(0);
  currentMovie = computed(() => this.upcomingMovies()?.[this.currentIndex()]);
  isImageLoaded = signal<boolean>(false);
  backdropImageUrl = computed(() =>
    CreateImageUrl(this.currentMovie()?.backdrop_path),
  );
  private timeoutId?: ReturnType<typeof setTimeout>;
  private readonly SLIDE_DURATION_MS = 6000;

  constructor() {
    effect(() => {
      if (this.isImageLoaded()) {
        this.startTimer();
      }
    });

    effect(() => {
      this.currentMovie(); // Read it for firing this code
      this.isImageLoaded.set(false);
      this.clearTimeout();
    });
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    // this.restartAutoPlay();
  }

  private next(): void {
    const movies = this.upcomingMovies();

    if (!movies?.length) {
      return;
    }

    this.currentIndex.update((index) => (index + 1) % movies.length);
  }

  private startTimer(): void {
    this.clearTimeout();

    this.timeoutId = setTimeout(() => this.next(), this.SLIDE_DURATION_MS);
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
