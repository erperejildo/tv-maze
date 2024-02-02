import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SeasonsComponent } from './seasons.component';
import { ShowsService } from '../services/shows.service';
import { of } from 'rxjs';
import { Season } from '../interfaces/season';
import { Episode } from '../interfaces/episode';

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockSeasons: Season[] = [
    {
      id: 58658,
      url: 'https://www.tvmaze.com/seasons/58658/kirby-buckets-season-3',
      number: 3,
      name: 'Kirby Buckets Warped',
      episodeOrder: 13,
      premiereDate: '2017-01-16',
      endDate: '2017-02-02',
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
      webChannel: null,
      image: null,
      summary:
        '<p>Season 3 of <i>Kirby Buckets</i> was confirmed on March 4, 2016. it will contain 22 episodes. Production began on May 23, 2016 and ended on September 7, 2016. This season is set to premiere on January 16, 2017, it contains 13 episodes, and has a title change, with the new title being <b>Kirby Buckets Warped.</b></p>',
      _links: {
        self: {
          href: 'https://api.tvmaze.com/seasons/58658',
        },
      },
    },
  ];

  const mockEpisodes: Episode[] = [
    {
      id: 1051658,
      url: 'https://www.tvmaze.com/episodes/1051658/kirby-buckets-3x13-yep-still-happening',
      name: 'Yep, Still Happening',
      season: 3,
      number: 13,
      type: 'regular',
      airdate: '2017-02-02',
      airtime: '07:00',
      airstamp: '2017-02-02T12:00:00+00:00',
      runtime: 30,
      rating: {
        average: null,
      },
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_landscape/303/759665.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/303/759665.jpg',
      },
      summary:
        '<p>While Lord Mitchell gains power from orbs retrieved by his minions, Kirby prepares himself for battle by training to be a gatekeeper with Mitchell Prime.</p>',
      _links: {
        self: {
          href: 'https://api.tvmaze.com/episodes/1051658',
        },
        show: {
          href: 'https://api.tvmaze.com/shows/250',
        },
      },
    },
  ];

  beforeEach(waitForAsync(() => {
    mockShowsService = jasmine.createSpyObj('ShowsService', [
      'getShowSeasonsById',
      'getSeasonEpisodesById',
    ]);

    TestBed.configureTestingModule({
      declarations: [SeasonsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 1 })),
          },
        },
        { provide: ShowsService, useValue: mockShowsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch seasons and episodes on init', () => {
    mockShowsService.getShowSeasonsById.and.returnValue(of(mockSeasons));
    mockShowsService.getSeasonEpisodesById.and.returnValue(of(mockEpisodes));

    component.ngOnInit();

    expect(mockShowsService.getShowSeasonsById).toHaveBeenCalledWith(1);
    expect(mockShowsService.getSeasonEpisodesById).toHaveBeenCalledTimes(
      mockSeasons.length
    );

    expect(component.seasonsWithEpisodes.length).toEqual(mockSeasons.length);
    expect(component.seasonsWithEpisodes[0].episodes.length).toEqual(
      mockEpisodes.length
    );
  });

  it('should format dates correctly', () => {
    const dateString = '2017-01-16';
    const formattedDate = component.formatDate(dateString);
    expect(formattedDate).toEqual('16/01/2017');
  });

  it('should pad zero correctly', () => {
    const singleDigitNumber = 5;
    const doubleDigitNumber = 15;
    const paddedSingleDigit = component.padZero(singleDigitNumber);
    const paddedDoubleDigit = component.padZero(doubleDigitNumber);
    expect(paddedSingleDigit).toEqual('05');
    expect(paddedDoubleDigit).toEqual('15');
  });
});
