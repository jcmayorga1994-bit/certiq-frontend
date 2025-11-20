import { QuizType } from "@/models/quizType"
import BaseService from "./base"
export class QuizTypeService extends BaseService<QuizType>() {
    static get entity (): string {
        return 'quiztype'
    }
    static get responseName (): string {
        return 'quiztype'
    }
}