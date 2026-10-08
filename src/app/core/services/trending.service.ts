import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { Item } from '../models/item.interface';
import { ListResponse } from '../models/list-response.interface';
import { People } from '../models/people.interface';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  trendingAll(time: 'day' | 'week'): Observable<ListResponse<Item>> {
    return this.http.get<ListResponse<Item>>(
      `${this.apiBaseUrl}trending/all/${time}`,
    );
  }
}
