import { Component, inject } from '@angular/core';
import { ShowsService } from '../services/shows.service';
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Show, ShowSearch } from '../interfaces/show';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private showsService = inject(ShowsService);
  shows: Show[] = [];
  filteredShows: any[] = [];
  searchQuery: string = '';
  showSearch: boolean = false;
  private searchSubscription?: Subscription;
  private searchSubject = new Subject<string>();

  constructor() {}

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.showsService
      .getShowsByPage(1)
      .pipe(
        tap((data: Show[]) => {
          this.shows = data;
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching shows'));
        })
      )
      .subscribe();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchQuery = '';
      this.filteredShows = this.shows;
      this.getShows();
    }
  }

  searchShows(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) return this.getShows();

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000),
        switchMap((searchValue) =>
          this.showsService.getShowsBySearch(searchValue).pipe(
            catchError((error) => {
              return throwError(() => new Error('Error fetching shows'));
            })
          )
        )
      )
      .subscribe((data: ShowSearch[]) => {
        this.shows = data.map((item) => ({
          ...item.show,
        }));
      });

    this.searchSubject.next(searchTerm);
  }
}
