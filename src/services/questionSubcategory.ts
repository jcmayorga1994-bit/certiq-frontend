import { QuestionSubcategory } from "@/models/questionSubcategory"
import BaseService from "./base"
export class QuestionSubcategoryService extends BaseService<QuestionSubcategory>() {
    static get entity (): string {
        return 'questionsubcategory'
    }
    static get responseName (): string {
        return 'questionsubcategory'
    }
}