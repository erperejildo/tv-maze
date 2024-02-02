import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SeasonsComponent } from './seasons.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [SeasonsComponent],
  exports: [SeasonsComponent],
})
export class SeasonsComponentModule {}
