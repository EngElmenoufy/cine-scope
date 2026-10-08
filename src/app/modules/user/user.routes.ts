import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './trending/trending.component';
import { heroUpcomingMoviesResolver } from './home/resolvers/hero-upcoming-movies.resolver';
import { ListComponent } from './list/list.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      upcomingMovies: heroUpcomingMoviesResolver,
    },
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'trending',
    component: TrendingComponent,
  },
];
