
export interface Genre {
	id: number;
	name: string;
}

export interface Production_company {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface Production_country {
	iso_3166_1: string;
	name: string;
}

export interface Spoken_language {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface CreatedBy {
	id: number
	credit_id: string
	name: string
	original_name: string
	gender: number
	profile_path?: string
  }

  export interface LastEpisodeToAir {
	id: number
	name: string
	overview: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	episode_type: string
	production_code: string
	runtime: number
	season_number: number
	show_id: number
	still_path: string
  }

  export interface NextEpisodeToAir {
	id: number
	name: string
	overview: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	episode_type: string
	production_code: string
	runtime: any
	season_number: number
	show_id: number
	still_path: any
  }


  export interface Season {
	air_date: string
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path: string
	season_number: number
	vote_average: number
  }
  export interface belongs_to_collection {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
  }
  

  export interface Network {
	id: number
	logo_path: string
	name: string
	origin_country: string
  }



export interface ImDetails {

	// Movie
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection?: belongs_to_collection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Production_company[];
	production_countries: Production_country[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: Spoken_language[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;



	// TV
  created_by: CreatedBy[]
  episode_run_time: any[]
  first_air_date: string

  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air: NextEpisodeToAir
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number

  original_name: string

  seasons: Season[]

  type: string

}

export interface NetworkDetails {
	headquarters: string;
	homepage: string;
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
  }