import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CastGalleryComponent } from './cast-gallery.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [CastGalleryComponent],
  exports: [CastGalleryComponent],
})
export class CastGalleryComponentModule {}
