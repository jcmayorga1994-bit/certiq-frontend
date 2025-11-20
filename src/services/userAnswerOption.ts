import { UserAnswerOption } from "@/models/userAnswerOption"
import BaseService from "./base"
export class UserAnswerOptionService extends BaseService<UserAnswerOption>() {
    static get entity (): string {
        return 'useransweroption'
    }
    static get responseName (): string {
        return 'useransweroption'
    }
}