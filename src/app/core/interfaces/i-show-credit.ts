
export interface IShowCredit {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
    job: string;


	
	roles: Role[];
	total_episode_count: number;

}
export interface Role {
	credit_id: string;
	character: string;
	episode_count: number;
}
