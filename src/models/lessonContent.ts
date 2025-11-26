import { Lesson } from "./lesson";

export interface LessonContent {
  id?: number | null;
  lesson_id:number;
  content_type:string;
  content_url:string;
  content_text:string;
  duration:number;
  language:string;
  content_json: any;
  slug:string;
  content_url_html:string;
  lesson?:Lesson | null;
}
