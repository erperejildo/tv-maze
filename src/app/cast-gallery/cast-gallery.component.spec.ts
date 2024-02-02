import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CastGalleryComponent } from './cast-gallery.component';
import { ShowsService } from '../services/shows.service';
import { of } from 'rxjs';
import { Cast } from '../interfaces/cast';
import { mockCastResponse } from '../mocks/responses';

describe('CastGalleryComponent', () => {
  let component: CastGalleryComponent;
  let fixture: ComponentFixture<CastGalleryComponent>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockCast: Cast[] = mockCastResponse;

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
