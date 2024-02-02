import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Show } from '../interfaces/show';
import { ShowsService } from '../services/shows.service';
import { ShowDetailsPage } from './show-details.page';

describe('ShowDetailsPage', () => {
  let component: ShowDetailsPage;
  let fixture: ComponentFixture<ShowDetailsPage>;
  let mockActivatedRoute: any;
  let mockModal: any;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockShow: Show = {
    id: 1,
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

  beforeEach(waitForAsync(() => {
    mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: '1' })),
    };

    mockModal = {
      present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
    };

    mockShowsService = jasmine.createSpyObj('ShowsService', [
      'getShowDetailsById',
    ]);

    TestBed.configureTestingModule({
      declarations: [ShowDetailsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ModalController, useValue: { create: () => mockModal } },
        { provide: ShowsService, useValue: mockShowsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch show details on init', () => {
    mockShowsService.getShowDetailsById.and.returnValue(of(mockShow));

    component.ngOnInit();

    expect(mockShowsService.getShowDetailsById).toHaveBeenCalledWith(1);
    expect(component.show).toEqual(mockShow);
  });

  it('should open image gallery modal', async () => {
    mockShowsService.getShowDetailsById.and.returnValue(of(mockShow));

    await component.ngOnInit();
    await component.openGallery();

    expect(mockModal.present).toHaveBeenCalled();
  });
});
