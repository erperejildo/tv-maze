import { Episode } from './episode';

export interface Season {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  };
  webChannel: string | null;
  image: { medium: string; original?: string } | null;
  summary: string | null;
  _links: {
    self: {
      href: string;
    };
  };
}

export interface SeasonsWithEpisodes extends Season {
  episodes: Episode[];
}
