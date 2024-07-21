export type GenreKeys = keyof typeof genres;


export interface IMovie {
  id:	number;
  title:	string;
  originalTitle:	string;
  language:	string;
  releaseYear:	number;
  releaseDate:	string;
  genres:	GenreKeys[];
  plot:	string;
  runtime:	number;
  budget:	string;
  revenue:	string;
  homepage:	string;
  status:	string;
  posterUrl:	string;
  backdropUrl:	string;
  trailerUrl:	string;
  trailerYoutubeId:	string;
  tmdbRating:	number;
  searchL:	string;
  keywords:	string[];
  countriesOfOrigin:	string[];
  languages:	string[];
  cast:	string[];
  director:	string;
  production:	string;
  awardsSummary:	string;
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