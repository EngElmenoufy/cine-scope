import { TvSeriesListService } from './../../../../../core/services/tv-series-list.service';
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
  selector: 'app-top-rating-tv',
  imports: [
    ExploreContentComponent,
    SliderComponent,
    CardComponent,
    CardLoadingComponent,
  ],
  templateUrl: './top-rating-tv.component.html',
  styleUrl: './top-rating-tv.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRatingTvComponent {
  private readonly tvSeriesListService = inject(TvSeriesListService);

  topRatingTv = signal<Item[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getTopRatingTv();
  }

  private getTopRatingTv(): void {
    this.isLoading.set(true);

    this.tvSeriesListService.getTopRatingTv().subscribe({
      next: (res) => {
        this.topRatingTv.set(res.results);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
