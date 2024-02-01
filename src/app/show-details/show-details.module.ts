import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailsPage } from './show-details.page';
import { IonicModule } from '@ionic/angular';
import { ShowDetailsPageRoutingModule } from './show-details-routing.module';
import { ImageGalleryComponentModule } from '../image-gallery/image-gallery.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ImageGalleryComponentModule,
    ShowDetailsPageRoutingModule,
  ],
  declarations: [ShowDetailsPage],
})
export class ShowDetailsPageModule {}
