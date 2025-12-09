import { Certification } from "@/models/certification"
import BaseService from "./base"
export class CertificationService extends BaseService<Certification>() {
    static get entity(): string {
        return 'certification'
    }
    static get responseName(): string {
        return 'certification'
    }
    static async get_public(): Promise<Certification[]> {
        try {
            return await this.submit<Certification[]>({
                method: 'get',
                path:`/public/public_index`,
                isFullPath: true
            });
        } catch (error) {
            this.handleApiError(error, 'error al cargar las certificaciones');
        }
    }
}