import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { Item } from '../models/item.interface';
import { ListResponse } from '../models/list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  searchMulti(query: string): Observable<ListResponse<Item>> {
    const params = new HttpParams().set('query', query);

    return this.http.get<ListResponse<Item>>(`${this.apiBaseUrl}search/multi`, {
      params,
    });
  }
}
