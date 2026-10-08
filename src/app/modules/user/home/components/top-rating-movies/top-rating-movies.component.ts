import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Item } from '../../../../../core/models/item.interface';
import { MovieListsService } from '../../../../../core/services/movie-lists.service';
import { ExploreContentComponent } from '../explore-content/explore-content.component';
import { SliderComponent } from '../../../../../shared/components/slider/slider.component';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { CardLoadingComponent } from '../../../../../shared/components/loading/card-loading/card-loading.component';

@Component({
  selector: 'app-top-rating-movies',
  imports: [
    ExploreContentComponent,
    SliderComponent,
    CardComponent,
    CardLoadingComponent,
  ],
  templateUrl: './top-rating-movies.component.html',
  styleUrl: './top-rating-movies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRatingMoviesComponent {
  private readonly movieListsService = inject(MovieListsService);

  topRatingMovies = signal<Item[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getTopRatingMovies();
  }

  private getTopRatingMovies(): void {
    this.isLoading.set(true);

    this.movieListsService.getTopRatingMovies().subscribe({
      next: (res) => {
        this.topRatingMovies.set(res.results);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
