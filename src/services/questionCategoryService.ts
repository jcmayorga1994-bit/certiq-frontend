import BaseService from "./base"
import { QuestionCategory } from "@/models/questionCategory"
export class QuestionCategoryService extends BaseService<QuestionCategory>() {
    static get entity (): string {
        return 'questioncategory'
    }
    static get responseName (): string {
        return 'questioncategory'
    }
}