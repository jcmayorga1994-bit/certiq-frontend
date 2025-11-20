import { Certification } from "@/models/certification"
import BaseService from "./base"
export class CertificationService extends BaseService<Certification>() {
    static get entity (): string {
        return 'certification'
    }
    static get responseName (): string {
        return 'certification'
    }
}