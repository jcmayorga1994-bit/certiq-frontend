import BaseService from './base';
import { User } from '@/models/user';

interface auth {
    email: string,
    password: string
}
interface response_auth {
    message: string;
    success: string,
    token: string,
    user: User
}
interface response_register {
    success: string,
    token: string,
    user: User,
    token_type: string
}
class AuthService extends BaseService {
    private readonly ENTITY_NAME = 'auth';

    constructor() {
        super(); // usa el baseURL configurado
    }

    async register(user: Omit<User, 'id'>): Promise<response_register> {
        try {            
            const data = await this.post<response_register>(`/public/${this.ENTITY_NAME}/register`, user);
            return data;
        } catch (error) {
            this.handleApiError(error, this.ENTITY_NAME, '');
            throw error;
        }
    }
    async login(auth: auth): Promise<response_auth> {
        try {
            const data = await this.post<response_auth>(`/public/${this.ENTITY_NAME}/login`, auth);
            return data;
        } catch (error) {
            this.handleApiError(error, this.ENTITY_NAME, '');
            throw error;
        }
    }
    async me(): Promise<{ success: string, user: User }> {
        try {
            const data = await this.get<{ success: string, user: User }>(`/${this.ENTITY_NAME}/me`);
            return data;
        } catch (error) {
            this.handleApiError(error, this.ENTITY_NAME, '');
            throw error;
        }
    }
    async logout(): Promise<any> {
        try {
            const data = await this.get<any>(`/${this.ENTITY_NAME}/logout`);
            return data;
        } catch (error) {
            this.handleApiError(error, this.ENTITY_NAME, '');
            throw error;
        }
    }
}

export const AUTH_SERVICE = new AuthService();