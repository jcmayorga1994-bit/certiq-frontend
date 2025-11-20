import BaseService from "./base"
import { QuestionAnalytics } from "@/models/questionAnalytics"
export class QuestionAnalyticsService extends BaseService<QuestionAnalytics>() {
    static get entity (): string {
        return 'questionanalytics'
    }
    static get responseName (): string {
        return 'questionanalytics'
    }
}