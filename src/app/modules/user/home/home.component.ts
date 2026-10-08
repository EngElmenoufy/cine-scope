import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UpcomingResponse } from '../../../core/models/movie-lists.interface';
import { CardLoadingComponent } from '../../../shared/components/loading/card-loading/card-loading.component';
import { ExploreContentLoadingComponent } from '../../../shared/components/loading/explore-content-loading/explore-content-loading.component';
import { RoundedCardLoadingComponent } from '../../../shared/components/loading/rounded-card-loading/rounded-card-loading.component';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
import { HeroComponent } from './components/hero/hero.component';
import { PopularPeopleComponent } from './components/popular-people/popular-people.component';
import { TopRatingMoviesComponent } from './components/top-rating-movies/top-rating-movies.component';
import { TopRatingTvComponent } from './components/top-rating-tv/top-rating-tv.component';
import { TrendingNowComponent } from './components/trending-now/trending-now.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    SliderComponent,
    TrendingNowComponent,
    ExploreContentLoadingComponent,
    CardLoadingComponent,
    TopRatingMoviesComponent,
    PopularPeopleComponent,
    TopRatingTvComponent,
    RoundedCardLoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  upcomingMovies = input<UpcomingResponse>();
}
