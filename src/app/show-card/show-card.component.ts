import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCardComponent {
  private platform = inject(Platform);
  @Input() show?: Show;

  isIos() {
    return this.platform.is('ios');
  }
}
