import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ShowsService } from '../services/shows.service';
import { Show } from '../interfaces/show';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
})
export class ShowDetailsPage implements OnInit {
  show?: Show;
  private showsService = inject(ShowsService);
  private platform = inject(Platform);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = parseInt(id, 10);
        this.getShow(numericId);
      }
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  getShow(id: number) {
    this.showsService
      .getShowDetailsById(id)
      .pipe(
        tap((data: Show) => {
          this.show = data;
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching show'));
        })
      )
      .subscribe();
  }
}
