import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ShowsService } from '../services/shows.service';
import { Show } from '../interfaces/show';
import { catchError, tap, throwError } from 'rxjs';
import { Cast } from '../interfaces/cast';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
})
export class ShowDetailsPage implements OnInit {
  show?: Show;
  cast?: Cast[];
  @ViewChild('horizontalScroll') horizontalScroll: any;
  swiperRef: ElementRef | undefined;
  imageLoaded: boolean = false;
  private showsService = inject(ShowsService);
  private platform = inject(Platform);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = parseInt(id, 10);
        this.getShow(numericId);
        this.getCast(numericId);
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
          console.log('SHOW: ', data);
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching show'));
        })
      )
      .subscribe();
  }

  getCast(id: number) {
    this.showsService
      .getCastById(id)
      .pipe(
        tap((data: Cast[]) => {
          this.cast = data;
          console.log('CAST: ', data);
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching cast'));
        })
      )
      .subscribe();
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Ongoing';

    const date = new Date(dateString);
    return `${this.padZero(date.getDate())}/${this.padZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  scrollHorizontal(distance: number) {
    this.horizontalScroll.nativeElement.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleImageError() {
    // TODO
    // this.show.image.original = 'path/to/default/image.jpg';
    this.imageLoaded = true;
  }
}
