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
import { mockShowSearchResponse, mockShowsResponse } from '../mocks/responses';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;

  const mockShows: Show[] = mockShowsResponse;

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
    const mockSearchResult: ShowSearch[] = mockShowSearchResponse;

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
