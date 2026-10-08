import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { Observable } from 'rxjs';
import { ListResponse } from '../models/list-response.interface';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root',
})
export class TvSeriesListService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getTopRatingTv(page: number = 1): Observable<ListResponse<Item>> {
    const params = new HttpParams().set('page', page);

    return this.http.get<ListResponse<Item>>(`${this.apiBaseUrl}tv/top_rated`, {
      params,
    });
  }
}
