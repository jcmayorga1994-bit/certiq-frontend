import { User } from "@/models/user"
import BaseService from "./base"
export class UserService extends BaseService<User>() {
    static get entity (): string {
        return 'user'
    }
    static get responseName (): string {
        return 'user'
    }
}