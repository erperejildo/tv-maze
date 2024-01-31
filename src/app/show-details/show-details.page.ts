import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { ShowsService } from '../services/shows.service';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
})
export class ViewMessagePage implements OnInit {
  @Input() show?: Show;
  private showsService = inject(ShowsService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    // not used for now
    // const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // this.show = this.showsService.getMessageById(parseInt(id, 10));
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }
}
