import { QuizAttempt } from "@/models/quizAttempt"
import BaseService from "./base"
export class QuizAttemptService extends BaseService<QuizAttempt>() {
    static get entity (): string {
        return 'quizattempt'
    }
    static get responseName (): string {
        return 'quizattempt'
    }
}