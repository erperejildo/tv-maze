import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show, ShowSearch } from '../interfaces/show';
import { Cast } from '../interfaces/cast';
import { ShowImage } from '../interfaces/show-image';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private apiUrl = 'https://api.tvmaze.com';

  constructor(private http: HttpClient) {}

  getShowsByPage(page: number): Observable<Show[]> {
    const url = `${this.apiUrl}/shows?page=${page}`;
    return this.http.get<Show[]>(url);
  }

  getShowsBySearch(search: string): Observable<ShowSearch[]> {
    const url = `${this.apiUrl}/search/shows?q=${search}`;
    return this.http.get<ShowSearch[]>(url);
  }

  getShowDetailsById(id: number): Observable<Show> {
    const url = `${this.apiUrl}/shows/${id}`;
    return this.http.get<Show>(url);
  }

  getCastById(id: number): Observable<Cast[]> {
    const url = `${this.apiUrl}/shows/${id}/cast`;
    return this.http.get<Cast[]>(url);
  }

  getShowImagesById(id: number): Observable<ShowImage[]> {
    const url = `${this.apiUrl}/shows/${id}/images`;
    return this.http.get<ShowImage[]>(url);
  }
}
