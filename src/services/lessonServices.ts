import { Lesson } from "@/models/lesson"
import BaseService from "./base"
export class LessonService extends BaseService<Lesson>() {
    static get entity (): string {
        return 'lesson'
    }
    static get responseName (): string {
        return 'lesson'
    }
}