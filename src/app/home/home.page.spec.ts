import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { ShowsService } from '../services/shows.service';
import { of } from 'rxjs';
import { Show, ShowSearch } from '../interfaces/show';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockShows: Show[] = [
    {
      id: 250,
      url: 'https://www.tvmaze.com/shows/250/kirby-buckets',
      name: 'Kirby Buckets',
      type: 'Scripted',
      language: 'English',
      genres: ['Comedy'],
      status: 'Ended',
      runtime: 30,
      averageRuntime: 30,
      premiered: '2014-10-20',
      ended: '2017-02-02',
      officialSite: 'http://disneyxd.disney.com/kirby-buckets',
      schedule: {
        time: '07:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      },
      rating: {
        average: null,
      },
      weight: 73,
      network: {
        id: 25,
        name: 'Disney XD',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
        officialSite: null,
      },
      webChannel: {
        id: 83,
        name: 'DisneyNOW',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
        officialSite: 'https://disneynow.com/',
      },
      dvdCountry: null,
      externals: {
        tvrage: 37394,
        thetvdb: 278449,
        imdb: 'tt3544772',
      },
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg',
      },
      summary:
        "<p>The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character. <b>Kirby Buckets</b> introduces viewers to the vivid imagination of charismatic 13-year-old Kirby Buckets, who dreams of becoming a famous animator like his idol, Mac MacCallister. With his two best friends, Fish and Eli, by his side, Kirby navigates his eccentric town of Forest Hills where the trio usually find themselves trying to get out of a predicament before Kirby's sister, Dawn, and her best friend, Belinda, catch them. Along the way, Kirby is joined by his animated characters, each with their own vibrant personality that only he and viewers can see.</p>",
      updated: 1704795334,
      _links: {
        self: {
          href: 'https://api.tvmaze.com/shows/250',
        },
        previousepisode: {
          href: 'https://api.tvmaze.com/episodes/1051658',
        },
      },
    },
  ];

  beforeEach(waitForAsync(() => {
    mockShowsService = jasmine.createSpyObj('ShowsService', [
      'getShowsByPage',
      'getShowsBySearch',
    ]);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ShowsService, useValue: mockShowsService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search shows and update results', fakeAsync(() => {
    const event = { target: { value: 'kirby' } };
    const mockSearchResult: ShowSearch[] = [
      {
        score: 1,
        show: mockShows[0],
      },
    ];
    mockShowsService.getShowsBySearch.and.returnValue(of(mockSearchResult));

    component.searchShows(event);
    tick(1000);

    expect(mockShowsService.getShowsBySearch).toHaveBeenCalledWith('kirby');
    expect(component.shows).toEqual(mockShows);
  }));

  it('should sort shows by rating', () => {
    const sortedShows = [...mockShows];
    sortedShows.sort(
      (a, b) => (b.rating.average || 0) - (a.rating.average || 0)
    );

    component.shows = [...mockShows];
    component.sortShows('rating');

    expect(component.shows).toEqual(sortedShows);
  });

  it('should sort shows by name', () => {
    const sortedShows = [...mockShows];
    sortedShows.sort((a, b) => a.name.localeCompare(b.name));

    component.shows = [...mockShows];
    component.sortShows('name');

    expect(component.shows).toEqual(sortedShows);
  });
});
