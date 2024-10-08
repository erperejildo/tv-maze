import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailsPage } from './show-details.page';
import { IonicModule } from '@ionic/angular';
import { ShowDetailsPageRoutingModule } from './show-details-routing.module';
import { SeasonsComponentModule } from '../seasons/seasons.component.module';
import { ImageGalleryComponentModule } from '../image-gallery/image-gallery.module';
import { CastGalleryComponentModule } from '../cast-gallery/cast-gallery.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SeasonsComponentModule,
    ImageGalleryComponentModule,
    CastGalleryComponentModule,
    ShowDetailsPageRoutingModule,
  ],
  declarations: [ShowDetailsPage],
})
export class ShowDetailsPageModule {}
