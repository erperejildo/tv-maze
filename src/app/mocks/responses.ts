import { Show, ShowSearch } from '../interfaces/show';
import { Season } from '../interfaces/season';
import { Episode } from '../interfaces/episode';
import { Cast } from '../interfaces/cast';
import { ShowImage } from '../interfaces/show-image';

export const mockShowsResponse: Show[] = [
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

export const mockShowSearchResponse: ShowSearch[] = [
  {
    score: 1,
    show: mockShowsResponse[0],
  },
];

export const mockSeasonsResponse: Season[] = [
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

export const mockEpisodesResponse: Episode[] = [
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

export const mockCastResponse: Cast[] = [
  {
    person: {
      id: 14245,
      url: 'https://www.tvmaze.com/people/14245/bryan-cranston',
      name: 'Bryan Cranston',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York',
      },
      birthday: '1956-03-07',
      deathday: null,
      gender: 'Male',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/195/488839.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/195/488839.jpg',
      },
      updated: 1706719093,
      _links: {
        self: {
          href: 'https://api.tvmaze.com/people/14245',
        },
      },
    },
    character: {
      id: 45529,
      url: 'https://www.tvmaze.com/characters/45529/breaking-bad-walter-white',
      name: 'Walter White',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/0/2404.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/0/2404.jpg',
      },
      _links: {
        self: {
          href: 'https://api.tvmaze.com/characters/45529',
        },
      },
    },
    self: false,
    voice: false,
  },
  {
    person: {
      id: 12328,
      url: 'https://www.tvmaze.com/people/12328/aaron-paul',
      name: 'Aaron Paul',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York',
      },
      birthday: '1979-08-27',
      deathday: null,
      gender: 'Male',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/264/660079.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/264/660079.jpg',
      },
      updated: 1693434536,
      _links: {
        self: {
          href: 'https://api.tvmaze.com/people/12328',
        },
      },
    },
    character: {
      id: 45531,
      url: 'https://www.tvmaze.com/characters/45531/breaking-bad-jesse-pinkman',
      name: 'Jesse Pinkman',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/0/2408.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/0/2408.jpg',
      },
      _links: {
        self: {
          href: 'https://api.tvmaze.com/characters/45531',
        },
      },
    },
    self: false,
    voice: false,
  },
];

export const mockImagesResponse: ShowImage[] = [
  {
    id: 4596,
    type: 'poster',
    main: true,
    resolutions: {
      original: {
        url: 'https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg',
        width: 680,
        height: 1000,
      },
      medium: {
        url: 'https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg',
        width: 210,
        height: 295,
      },
    },
  },
  {
    id: 41059,
    type: 'background',
    main: false,

    resolutions: {
      original: {
        url: 'https://static.tvmaze.com/uploads/images/original_untouched/16/41286.jpg',
        width: 670,
        height: 377,
      },
    },
  },
];
