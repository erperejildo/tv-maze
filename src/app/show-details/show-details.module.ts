import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewMessagePage } from './show-details.page';

import { IonicModule } from '@ionic/angular';

import { ViewMessagePageRoutingModule } from './show-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMessagePageRoutingModule,
  ],
  declarations: [ViewMessagePage],
})
export class ViewMessagePageModule {}
