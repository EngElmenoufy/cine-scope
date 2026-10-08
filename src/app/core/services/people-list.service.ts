import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { Observable } from 'rxjs';
import { ListResponse } from '../models/list-response.interface';
import { People } from '../models/people.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleListService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getPopularPeople(page: number = 1): Observable<ListResponse<People>> {
    const params = new HttpParams().set('page', page);

    return this.http.get<ListResponse<People>>(
      `${this.apiBaseUrl}person/popular`,
      {
        params,
      },
    );
  }
}
