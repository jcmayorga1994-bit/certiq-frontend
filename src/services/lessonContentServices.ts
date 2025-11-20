import BaseService from "./base"
import { LessonContent } from "@/models/lessonContent"
export class LessonContentService extends BaseService<LessonContent>() {
    static get entity (): string {
        return 'lessoncontent'
    }
    static get responseName (): string {
        return 'lessoncontent'
    }
}