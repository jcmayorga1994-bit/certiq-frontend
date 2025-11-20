import { Question } from "@/models/question"
import BaseService from "./base"
export class QuestionService extends BaseService<Question>() {
    static get entity (): string {
        return 'question'
    }
    static get responseName (): string {
        return 'question'
    }
}