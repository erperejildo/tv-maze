import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ImageGalleryComponent } from './image-gallery.component';
import { ShowsService } from '../services/shows.service';
import { of } from 'rxjs';
import { ShowImage } from '../interfaces/show-image';
import { mockImagesResponse } from '../mocks/responses';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;
  let mockShowsService: jasmine.SpyObj<ShowsService>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  const mockImages: ShowImage[] = mockImagesResponse;

  beforeEach(waitForAsync(() => {
    mockShowsService = jasmine.createSpyObj('ShowsService', [
      'getShowImagesById',
    ]);
    mockModalController = jasmine.createSpyObj('ModalController', ['dismiss']);

    TestBed.configureTestingModule({
      declarations: [ImageGalleryComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ShowsService, useValue: mockShowsService },
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch images on init if showId is provided', () => {
    component.showId = 1;
    mockShowsService.getShowImagesById.and.returnValue(of(mockImages));

    component.ngOnInit();

    expect(mockShowsService.getShowImagesById).toHaveBeenCalledWith(1);
    expect(component.showImages).toEqual(mockImages);
  });

  it('should not fetch images on init if showId is not provided', () => {
    mockShowsService.getShowImagesById.and.returnValue(of(mockImages));

    component.ngOnInit();

    expect(mockShowsService.getShowImagesById).not.toHaveBeenCalled();
    expect(component.showImages).toBeUndefined();
  });

  it('should dismiss modal', () => {
    component.dismissModal();

    expect(mockModalController.dismiss).toHaveBeenCalled();
  });
});
