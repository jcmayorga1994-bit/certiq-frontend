export interface QuestionFeedback {
  id?: number | null;
  user_id:number;
  question_id:number;
  feedback_type:string;
  comment:string;
  status:string;
}
