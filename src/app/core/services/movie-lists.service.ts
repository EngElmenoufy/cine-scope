import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { UpcomingResponse } from '../models/movie-lists.interface';
import { ListResponse } from '../models/list-response.interface';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieListsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getUpComingMovies(page: number = 1): Observable<UpcomingResponse> {
    const params = new HttpParams().set('page', page);

    return this.http.get<UpcomingResponse>(`${this.apiBaseUrl}movie/upcoming`, {
      params,
    });
  }

  getTopRatingMovies(page: number = 1): Observable<ListResponse<Item>> {
    const params = new HttpParams().set('page', page);

    return this.http.get<ListResponse<Item>>(
      `${this.apiBaseUrl}movie/top_rated`,
      {
        params,
      },
    );
  }
}
