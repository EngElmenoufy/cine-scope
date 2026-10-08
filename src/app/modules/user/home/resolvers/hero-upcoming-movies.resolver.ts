import { ResolveFn } from '@angular/router';
import { MovieListsService } from '../../../../core/services/movie-lists.service';
import { inject } from '@angular/core';
import { UpcomingResponse } from '../../../../core/models/movie-lists.interface';
import { Item } from '../../../../core/models/item.interface';

export const heroUpcomingMoviesResolver: ResolveFn<UpcomingResponse> = () => {
  const movieListsService = inject(MovieListsService);
  let upcomingMovies: Item[] = [];

  return movieListsService.getUpComingMovies();

  // console.log(upcomingMovies);

  // return upcomingMovies;
};
