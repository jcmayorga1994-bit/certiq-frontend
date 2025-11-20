import { UserAnswer } from "@/models/userAnswer"
import BaseService from "./base"
export class UserAnswerService extends BaseService<UserAnswer>() {
    static get entity (): string {
        return 'useranswer'
    }
    static get responseName (): string {
        return 'useranswer'
    }
}