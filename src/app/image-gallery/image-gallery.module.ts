import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImageGalleryComponent } from './image-gallery.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [ImageGalleryComponent],
  exports: [ImageGalleryComponent],
})
export class ImageGalleryComponentModule {}
