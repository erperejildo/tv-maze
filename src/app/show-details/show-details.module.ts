import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailsPage } from './show-details.page';
import { IonicModule } from '@ionic/angular';
import { ShowDetailsPageRoutingModule } from './show-details-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ShowDetailsPageRoutingModule],
  declarations: [ShowDetailsPage],
})
export class ShowDetailsPageModule {}
