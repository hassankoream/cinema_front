
export interface Known_for {
	backdrop_path: string;
	id: number;
	name: string;
    title: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

export interface IPerson {
	id: number;
	name: string;
	
	original_name: string;
	media_type: string;
	adult: boolean;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path: string;
	known_for: Known_for[];


	// adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday?: any;
	// gender: number;
	homepage?: any;
	// id: number;
	imdb_id: string;
	// known_for_department: string;
	// name: string;
	place_of_birth: string;
	// popularity: number;
	// profile_path: string;
}

export interface person_Ex_ids {
	id: number;
	freebase_mid: string;
	freebase_id: string;
	imdb_id: string;
	tvrage_id: number;
	wikidata_id: string;
	facebook_id?: any;
	instagram_id?: any;
	tiktok_id?: any;
	twitter_id?: any;
	youtube_id?: any;
}