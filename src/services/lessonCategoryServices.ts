import { LessonCategory } from "@/models/lessonCategory"
import BaseService from "./base"
export class LessonCategoryService extends BaseService<LessonCategory>() {
    static get entity (): string {
        return 'lessoncategory'
    }
    static get responseName (): string {
        return 'lessoncategory'
    }
}