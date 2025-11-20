import { Field } from "@/models/field"
import BaseService from "./base"
export class FieldService extends BaseService<Field>() {
    static get entity (): string {
        return 'field'
    }
    static get responseName (): string {
        return 'field'
    }
}