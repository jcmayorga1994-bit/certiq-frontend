import BaseService from "./base"
import { QuestionFeedback } from "@/models/questionFeedback"
export class QuestionFeedbackService extends BaseService<QuestionFeedback>() {
    static get entity (): string {
        return 'questionfeedback'
    }
    static get responseName (): string {
        return 'questionfeedback'
    }
}