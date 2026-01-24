export type FilmPersonDto = {
  personId: number;
  careerId: number;
};

export type FilmDto = {
  id: number;
  creatorId: string;
  name: string;
  yearOfRelease: number;
  duration: number;
  description: string;
  linkToPoster: string;
  linkToFilm: string;
  country: string;
  rating: number;
  ageRestriction: number;
  genreIds: number[];
  persons: FilmPersonDto[];
};

export type CreateFilmDto = {
  creatorId: string;
  name: string;
  yearOfRelease: number;
  duration: number;
  description: string;
  linkToPoster: string;
  linkToFilm: string;
  country: string;
  ageRestriction: number;
  genreIds: number[];
};

export type UpdateFilmDto = Omit<CreateFilmDto, 'creatorId'>;
