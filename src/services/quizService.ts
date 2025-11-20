import { Quiz } from "@/models/quiz"
import BaseService from "./base"
export class QuizService extends BaseService<Quiz>() {
    static get entity (): string {
        return 'quiz'
    }
    static get responseName (): string {
        return 'quiz'
    }
}