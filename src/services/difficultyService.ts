import BaseService from "./base"
import { Difficulty } from "@/models/difficulty"
export class DifficultyService extends BaseService<Difficulty>() {
    static get entity (): string {
        return 'difficulty'
    }
    static get responseName (): string {
        return 'difficulty'
    }
}