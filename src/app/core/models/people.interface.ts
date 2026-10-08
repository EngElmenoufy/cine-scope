export interface People {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  media_type?: string;
  popularity: number;
  profile_path: string;
  known_for?: PeopleKnownFor[];
}

export interface PeopleKnownFor {
  adult: boolean;
  backdrop_path: null | string | string;
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  softcore: boolean;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}
