import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Show } from '../interfaces/show';
import { ShowCardComponent } from './show-card.component';
import { Router } from '@angular/router';

describe('ShowCardComponent', () => {
  let component: ShowCardComponent;
  let fixture: ComponentFixture<ShowCardComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to show details when showClicked is called', () => {
    const show: Show = {
      id: 123,
      name: 'Test Show',
      image: {
        medium: 'test-image.jpg',
        original: 'test-image.jpg',
      },
      url: '',
      type: '',
      language: '',
      genres: [],
      status: '',
      runtime: 0,
      averageRuntime: 0,
      premiered: '',
      ended: '',
      officialSite: '',
      schedule: {
        time: '',
        days: [],
      },
      rating: {
        average: 0,
      },
      weight: 0,
      network: null,
      webChannel: null,
      dvdCountry: undefined,
      externals: {
        tvrage: 0,
        thetvdb: 0,
        imdb: '',
      },
      summary: '',
      updated: 0,
      _links: {
        self: {
          href: '',
        },
        previousepisode: {
          href: '',
        },
      },
    };
    const routerSpy = spyOn(router, 'navigate');

    component.show = show;
    component.showClicked(show.id);

    expect(routerSpy).toHaveBeenCalledWith(['/show', show.id]);
  });

  it('should return cover image url if show has image', () => {
    const showWithImage: Show = {
      id: 123,
      name: 'Test Show',
      image: { medium: 'test-image.jpg' },
      url: '',
      type: '',
      language: '',
      genres: [],
      status: '',
      runtime: 0,
      averageRuntime: 0,
      premiered: '',
      ended: '',
      officialSite: '',
      schedule: {
        time: '',
        days: [],
      },
      rating: {
        average: 0,
      },
      weight: 0,
      network: null,
      webChannel: null,
      dvdCountry: undefined,
      externals: {
        tvrage: 0,
        thetvdb: 0,
        imdb: '',
      },
      summary: '',
      updated: 0,
      _links: {
        self: {
          href: '',
        },
        previousepisode: {
          href: '',
        },
      },
    };
    component.show = showWithImage;

    const coverImageUrl = component.coverImage();

    expect(coverImageUrl).toEqual(showWithImage.image!.medium);
  });

  it('should return default image url if show has no image', () => {
    const showWithoutImage: Show = {
      id: 123,
      name: 'Test Show',
      url: '',
      type: '',
      language: '',
      genres: [],
      status: '',
      runtime: 0,
      averageRuntime: 0,
      premiered: '',

      ended: '',
      officialSite: '',
      schedule: {
        time: '',
        days: [],
      },
      rating: {
        average: 0,
      },
      weight: 0,
      network: null,
      webChannel: null,
      dvdCountry: undefined,
      externals: {
        tvrage: 0,
        thetvdb: 0,
        imdb: '',
      },
      summary: '',
      updated: 0,
      _links: {
        self: {
          href: '',
        },
        previousepisode: {
          href: '',
        },
      },
    };
    component.show = showWithoutImage;

    const coverImageUrl = component.coverImage();

    expect(coverImageUrl).toEqual('assets/no-image.jpg');
  });
});
