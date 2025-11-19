export interface QuizAttempt {
  id?: number | null;
  user_id:number;
  quiz_id:number;
  attempt_number:number;
  score:string;
  max_score:string;
  percentage:string;
  status:string;
  passed:string;
  started_at:string;
  time_spent:string;
  ip_address?:string | null;
}
