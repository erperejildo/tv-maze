import { Component, OnInit, inject } from '@angular/core';
import { Season, SeasonsWithEpisodes } from '../interfaces/season';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from '../services/shows.service';
import { catchError, tap, throwError } from 'rxjs';
import { Episode } from '../interfaces/episode';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent implements OnInit {
  seasons: Season[] = [];
  seasonsWithEpisodes: SeasonsWithEpisodes[] = [];
  private showsService = inject(ShowsService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = parseInt(id, 10);
        this.getSeasons(numericId);
      }
    });
  }

  getSeasons(id: number) {
    this.showsService
      .getShowSeasonsById(id)
      .pipe(
        tap((data: Season[]) => {
          this.seasons = data.reverse(); // newest first
          for (let i = 0; i < data.length; i++) {
            this.getEpisodes(data[i].id, i);
          }
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching seasons'));
        })
      )
      .subscribe();
  }

  getEpisodes(id: number, index: number) {
    this.showsService
      .getSeasonEpisodesById(id)
      .pipe(
        tap((data: Episode[]) => {
          const seasonWithEpisodes: SeasonsWithEpisodes = {
            ...this.seasons[index],
            episodes: data.reverse(),
          };
          this.seasonsWithEpisodes?.push(seasonWithEpisodes);
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching seasons'));
        })
      )
      .subscribe();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${this.padZero(date.getDate())}/${this.padZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
