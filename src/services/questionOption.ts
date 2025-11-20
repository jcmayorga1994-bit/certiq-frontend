import { QuestionOption } from "@/models/questionOptions"
import BaseService from "./base"
export class QuestionOptionService extends BaseService<QuestionOption>() {
    static get entity (): string {
        return 'questionoption'
    }
    static get responseName (): string {
        return 'questionoption'
    }
}