import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Show } from '../interfaces/show';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCardComponent {
  private platform = inject(Platform);
  @Input() show?: Show;
  constructor(private router: Router) {}

  isIos() {
    return this.platform.is('ios');
  }

  showClicked(id: number) {
    this.router.navigate(['/show', id]);
  }
}
