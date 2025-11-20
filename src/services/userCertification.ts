import { UserCertification } from "@/models/userCertification"
import BaseService from "./base"
export class UserCertificationService extends BaseService<UserCertification>() {
    static get entity (): string {
        return 'usercertification'
    }
    static get responseName (): string {
        return 'usercertification'
    }
}