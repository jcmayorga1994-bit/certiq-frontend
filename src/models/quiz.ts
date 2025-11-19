export interface Quiz {
  id?: number | null;
  title:string;
  description:string;
  time_limit:number;
  passing_score:number;
  max_attempts:number;
  state:string;
  difficulty_id:string;
  quiz_type_id:number;
}
