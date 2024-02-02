import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ShowsService } from './shows.service';
import { Show, ShowSearch } from '../interfaces/show';
import { Cast } from '../interfaces/cast';
import { ShowImage } from '../interfaces/show-image';
import { Season } from '../interfaces/season';
import { Episode } from '../interfaces/episode';
import {
  mockCastResponse,
  mockEpisodesResponse,
  mockImagesResponse,
  mockSeasonsResponse,
  mockShowSearchResponse,
  mockShowsResponse,
} from '../mocks/responses';

describe('ShowsService', () => {
  let service: ShowsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowsService],
    });
    service = TestBed.inject(ShowsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch shows by page', () => {
    const mockShows: Show[] = mockShowsResponse;
    const page = 1;
    service.getShowsByPage(page).subscribe((data) => {
      expect(data).toEqual(mockShows);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/shows?page=${page}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockShows);
  });

  it('should fetch shows by search', () => {
    const searchTerm = 'test';
    const mockShowSearch: ShowSearch[] = mockShowSearchResponse;
    service.getShowsBySearch(searchTerm).subscribe((data) => {
      expect(data).toEqual(mockShowSearch);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/search/shows?q=${searchTerm}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockShowSearch);
  });

  it('should fetch show details by ID', () => {
    const mockShow: Show = mockShowsResponse[0];
    const id = 123;
    service.getShowDetailsById(id).subscribe((data) => {
      expect(data).toEqual(mockShow);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/shows/${id}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockShow);
  });

  it('should fetch show seasons by ID', () => {
    const mockSeasons: Season[] = mockSeasonsResponse;
    const id = 169;
    service.getShowSeasonsById(id).subscribe((data) => {
      expect(data).toEqual(mockSeasons);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/shows/${id}/seasons`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockSeasons);
  });

  it('should fetch season episodes by ID', () => {
    const mockEpisodes: Episode[] = mockEpisodesResponse;
    const id = 123;
    service.getSeasonEpisodesById(id).subscribe((data) => {
      expect(data).toEqual(mockEpisodes);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/seasons/${id}/episodes`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockEpisodes);
  });

  it('should fetch cast by ID', () => {
    const mockCast: Cast[] = mockCastResponse;
    const id = 123;
    service.getCastById(id).subscribe((data) => {
      expect(data).toEqual(mockCast);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/shows/${id}/cast`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockCast);
  });

  it('should fetch show images by ID', () => {
    const mockImages: ShowImage[] = mockImagesResponse;
    const id = 123;
    service.getShowImagesById(id).subscribe((data) => {
      expect(data).toEqual(mockImages);
    });
    const req = httpTestingController.expectOne(
      `https://api.tvmaze.com/shows/${id}/images`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockImages);
  });
});
