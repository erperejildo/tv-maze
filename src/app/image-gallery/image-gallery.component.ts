import { Component, Input, OnInit, inject } from '@angular/core';
import { ShowsService } from '../services/shows.service';
import { catchError, tap, throwError } from 'rxjs';
import { ShowImage } from '../interfaces/show-image';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  @Input() showId?: number;
  showImages?: ShowImage[];
  private showsService = inject(ShowsService);

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.showId) return;
    this.getImages(this.showId);
  }

  getImages(id: number) {
    this.showsService
      .getShowImagesById(id)
      .pipe(
        tap((data: ShowImage[]) => {
          this.showImages = data;
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching show images'));
        })
      )
      .subscribe();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
