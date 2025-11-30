import { Lesson } from "@/models/lesson"
import BaseService from "./base"
interface RequestFindByCertification {
    certification_id:number;
}
export class LessonService extends BaseService<Lesson>() {
    static get entity (): string {
        return 'lesson'
    }
    static get responseName (): string {
        return 'lesson'
    }
    static async find_by_certification(request: RequestFindByCertification): Promise<Lesson[]> {
    try {
        return await this.submit<Lesson[], RequestFindByCertification>({
        method: 'post',
        path: `find_by_certification`,
        data: request,
        });
    } catch (error) {
        this.handleApiError(error, 'error al buscar la leccion');
    }
    }
    }
