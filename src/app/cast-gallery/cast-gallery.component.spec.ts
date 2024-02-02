import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CastGalleryComponent } from './cast-gallery.component';
import { ShowsService } from '../services/shows.service';
import { of } from 'rxjs';
import { Cast } from '../interfaces/cast';

describe('CastGalleryComponent', () => {
  let component: CastGalleryComponent;
  let fixture: ComponentFixture<CastGalleryComponent>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockCast: Cast[] = [
    {
      person: {
        id: 11544,
        url: 'https://www.tvmaze.com/people/11544/jacob-bertrand',
        name: 'Jacob Bertrand',
        country: null,
        birthday: null,
        deathday: null,
        gender: null,
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/461/1154731.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/461/1154731.jpg',
        },
        updated: 1694891147,
        _links: {
          self: {
            href: 'https://api.tvmaze.com/people/11544',
          },
        },
      },
      character: {
        id: 60488,
        url: 'https://www.tvmaze.com/characters/60488/kirby-buckets-kirby-buckets',
        name: 'Kirby Buckets',
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/16/41291.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/16/41291.jpg',
        },
        _links: {
          self: {
            href: 'https://api.tvmaze.com/characters/60488',
          },
        },
      },
      self: false,
      voice: false,
    },
  ];

  beforeEach(waitForAsync(() => {
    mockShowsService = jasmine.createSpyObj('ShowsService', ['getCastById']);

    TestBed.configureTestingModule({
      declarations: [CastGalleryComponent],
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
    fixture = TestBed.createComponent(CastGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cast on init', () => {
    mockShowsService.getCastById.and.returnValue(of(mockCast));

    component.ngOnInit();

    expect(mockShowsService.getCastById).toHaveBeenCalledWith(1);
    expect(component.cast).toEqual(mockCast);
  });

  it('should scroll horizontally', () => {
    const scrollDistance = 400;
    const scrollBySpy = jasmine.createSpyObj('scrollBy', ['scrollBy']);
    component.horizontalScroll = { nativeElement: scrollBySpy };

    component.scrollHorizontal(scrollDistance);

    expect(scrollBySpy.scrollBy).toHaveBeenCalledWith({
      left: scrollDistance,
      behavior: 'smooth',
    });
  });
});
