import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowCardComponent } from './show-card.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [ShowCardComponent],
  exports: [ShowCardComponent],
})
export class ShowCardComponentModule {}
