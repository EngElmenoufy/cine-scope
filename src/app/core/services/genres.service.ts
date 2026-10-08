import { inject, Injectable, signal } from '@angular/core';
import { Genre, GenresResponse } from '../models/genre.interface';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  private movieGenresSignal = signal<Genre[]>([]);
  private tvGenresSignal = signal<Genre[]>([]);

  movieGenres = this.movieGenresSignal.asReadonly();
  tvGenres = this.tvGenresSignal.asReadonly();

  getAllMovieGenres(): Observable<GenresResponse> {
    return this.http
      .get<GenresResponse>(this.apiBaseUrl + 'genre/movie/list')
      .pipe(tap((res) => this.movieGenresSignal.set(res.genres)));
  }

  getAllTvGenres(): Observable<GenresResponse> {
    return this.http
      .get<GenresResponse>(this.apiBaseUrl + 'genre/tv/list')
      .pipe(tap((res) => this.tvGenresSignal.set(res.genres)));
  }
}
