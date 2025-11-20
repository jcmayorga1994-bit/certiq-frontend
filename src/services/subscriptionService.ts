import { Subscription } from "@/models/subscription"
import BaseService from "./base"
export class SubscriptionService extends BaseService<Subscription>() {
    static get entity (): string {
        return 'subscription'
    }
    static get responseName (): string {
        return 'subscription'
    }
}