import { SocialAccount } from "@/models/socialAccount"
import BaseService from "./base"
export class SocialAccountService extends BaseService<SocialAccount>() {
    static get entity (): string {
        return 'socialaccount'
    }
    static get responseName (): string {
        return 'socialaccount'
    }
}