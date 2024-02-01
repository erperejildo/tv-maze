import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Show } from '../interfaces/show';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCardComponent {
  @Input() show?: Show;
  constructor(private router: Router) {}

  showClicked(id: number) {
    this.router.navigate(['/show', id]);
  }

  coverImage(): string {
    return this.show?.image ? this.show.image.medium : 'assets/no-image.jpg';
  }
}
