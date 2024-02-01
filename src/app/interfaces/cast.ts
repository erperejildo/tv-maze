export interface Cast {
  person: {
    id: number;
    url: string;
    name: string;
    country: string | null;
    birthday: string | null;
    deathday: string | null;
    gender: string | null;
    image: {
      medium: string;
      original: string;
    };
    updated: number;
    _links: {
      self: {
        href: string;
      };
    };
  };
  character: {
    id: number;
    url: string;
    name: string;
    image: {
      medium: string;
      original: string;
    };
    _links: {
      self: {
        href: string;
      };
    };
  };
  self: boolean;
  voice: boolean;
}
