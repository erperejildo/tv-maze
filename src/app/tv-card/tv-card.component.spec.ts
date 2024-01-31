import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TvCardComponent } from './tv-card.component';

describe('TvCardComponent', () => {
  let component: TvCardComponent;
  let fixture: ComponentFixture<TvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvCardComponent],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
