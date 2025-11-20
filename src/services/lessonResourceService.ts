import BaseService from "./base"
import { LessonResource } from "@/models/lessonResource"
export class LessonResourceService extends BaseService<LessonResource>() {
    static get entity (): string {
        return 'lessonresource'
    }
    static get responseName (): string {
        return 'lessonresource'
    }
}