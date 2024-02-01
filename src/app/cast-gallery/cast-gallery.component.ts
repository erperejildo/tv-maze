import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from '../services/shows.service';
import { catchError, tap, throwError } from 'rxjs';
import { Cast } from '../interfaces/cast';

@Component({
  selector: 'app-cast-gallery',
  templateUrl: './cast-gallery.component.html',
  styleUrls: ['./cast-gallery.component.scss'],
})
export class CastGalleryComponent implements OnInit {
  cast?: Cast[];
  @ViewChild('horizontalScroll') horizontalScroll: any;
  private showsService = inject(ShowsService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = parseInt(id, 10);
        this.getCast(numericId);
      }
    });
  }

  getCast(id: number) {
    this.showsService
      .getCastById(id)
      .pipe(
        tap((data: Cast[]) => {
          this.cast = data;
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching cast'));
        })
      )
      .subscribe();
  }

  scrollHorizontal(distance: number) {
    this.horizontalScroll.nativeElement.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  }
}
