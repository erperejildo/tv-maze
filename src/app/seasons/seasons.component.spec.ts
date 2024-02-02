import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SeasonsComponent } from './seasons.component';
import { ShowsService } from '../services/shows.service';
import { of } from 'rxjs';
import { Season } from '../interfaces/season';
import { Episode } from '../interfaces/episode';
import { mockEpisodesResponse, mockSeasonsResponse } from '../mocks/responses';

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockSeasons: Season[] = mockSeasonsResponse;

  const mockEpisodes: Episode[] = mockEpisodesResponse;

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
