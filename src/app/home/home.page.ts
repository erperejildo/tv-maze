import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { ShowsService } from '../services/shows.service';
import { catchError, tap, throwError } from 'rxjs';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private showsService = inject(ShowsService);
  shows: Show[] = [];

  constructor() {}

  ngOnInit() {
    this.getShows();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getShows() {
    this.showsService
      .getShowsByPage(1)
      .pipe(
        tap((data: Show[]) => {
          console.log(data);
          this.shows = data;
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching shows'));
        })
      )
      .subscribe();
  }
}
