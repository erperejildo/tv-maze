import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShowsService } from '../services/shows.service';
import { Show } from '../interfaces/show';
import { catchError, tap, throwError } from 'rxjs';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
})
export class ShowDetailsPage implements OnInit {
  show?: Show;
  private showsService = inject(ShowsService);

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = parseInt(id, 10);
        this.getShow(numericId);
      }
    });
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

  async openGallery() {
    if (!this.show) return;

    const modal = await this.modalController.create({
      component: ImageGalleryComponent,
      componentProps: {
        showId: this.show.id,
      },
    });
    return await modal.present();
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
}
