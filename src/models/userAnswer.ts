export interface UserAnswer {
  id?: number | null;
  quiz_attempt_id:number;
  question_id:number;
  selected_option_id:number;
  is_correct:string;
  answered_at:string;
}
