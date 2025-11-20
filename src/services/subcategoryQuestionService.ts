import { SubcategoryQuestion } from "@/models/subcategoryQuestion"
import BaseService from "./base"
export class SubcategoryQuestionService extends BaseService<SubcategoryQuestion>() {
    static get entity (): string {
        return 'subcategoryquestion'
    }
    static get responseName (): string {
        return 'subcategoryquestion'
    }
}