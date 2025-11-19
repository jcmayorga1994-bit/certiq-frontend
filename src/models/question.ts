export interface Question {
  id?: number | null;
  quiz_id:number;
  text:string;
  question_type:string;
  explanation:string;
  points:string;
}
