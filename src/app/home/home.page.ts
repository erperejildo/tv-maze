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
  sortName?: boolean;
  sortRating?: boolean;
  private searchSubscription?: Subscription;
  private searchSubject = new Subject<string>();

  constructor() {}

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.showsService
      .getShowsByPage(1) // getting first page as an example
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

  sortShows(type: string) {
    if (type === 'rating') {
      this.sortName = undefined;
      this.sortRating = !this.sortRating;

      return this.shows.sort((a, b) => {
        const ratingA = a.rating.average !== null ? a.rating.average : 0;
        const ratingB = b.rating.average !== null ? b.rating.average : 0;

        if (this.sortRating) {
          return ratingB - ratingA;
        } else {
          return ratingA - ratingB;
        }
      });
    } else {
      this.sortRating = undefined;
      this.sortName = !this.sortName;

      return this.shows.sort((a, b) => {
        if (this.sortName) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
  }
}
