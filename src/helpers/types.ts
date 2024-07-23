export type GenreKeys = keyof typeof genres;

export interface IMovie {
  id:	number;
  title: string;
  originalTitle: string;
  // language: string;
  releaseYear: number ;
  // releaseDate:	string;
  genres:	GenreKeys[];
  director:	string;
  budget:	string | number;
  runtime: number;
  tmdbRating:	number;
  plot:	string;
  backdropUrl:	string;
  posterUrl: string;
  // revenue: string;
  // homepage:	string;
  // status:	string;
  // trailerUrl:	string;
  // trailerYoutubeId:	string;
  // searchL:	string;
  // keywords:	string[];
  // countriesOfOrigin:	string[];
  // languages:	string[];
  // cast:	string[];
  // production:	string;
  // awardsSummary:	string;
}

export interface ICreateGenres {
  value: keyof typeof genres,
  name: typeof genres,
  isSelect: boolean
}

export const genres = {
  history: 'исторический',
  horror: 'фильм ужасов (хоррор)',
  scifi: 'научная фантастика',
  'stand-up': 'стенд-ап',
  fantasy: 'фэнтези',
  drama: 'драма',
  mystery: 'мистика',
  family: 'семейный фильм',
  comedy: 'комедия',
  romance: 'фильм о любви',
  music: 'музыкальный фильм',
  crime: 'криминальный фильм',
  'tv-movie': 'телефильм',
  documentary: 'документальный фильм',
  action: 'боевик',
  thriller: 'триллер',
  western: 'вестерн',
  animation: 'анимационный фильм',
  war: 'фильм о войне',
  adventure: 'приключенческий фильм',
}