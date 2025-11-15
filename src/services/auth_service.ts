import BaseService from './base';
import { User, UserModel } from '@/models/user';

interface auth {
  email: string,
  password: string
}
interface response_auth {
  data: {
    success: string,
    token: string,
    user: User
  }
}
interface response_register {
  data: {
    success: string,
    token: string,
    user: User,
    token_type: string
  }
}
class AuthService extends BaseService {
  private readonly ENTITY_NAME = 'auth';

  constructor() {
    super(); // usa el baseURL configurado
  }

  async register(user: Omit<User, 'id'>): Promise<response_register> {
    const data = await this.post<response_register>(`/public/${this.ENTITY_NAME}/register`, user);
    return data;
  }
  async login(auth: auth): Promise<response_auth> {
    const data = await this.get<response_auth>(`/public/${this.ENTITY_NAME}/login`);
    return data;
  }
  async me(): Promise<{
    data: {
      success: string,
      user: User
    }
  }> {
    const data = await this.get<{
      data: {
        success: string,
        user: User
      }
    }>(`/${this.ENTITY_NAME}/me`);
    return data;
  }
    async logout(): Promise<any> {
    const data = await this.get<any>(`/${this.ENTITY_NAME}/logout`);
    return data;
  }
}

export const AUTH_SERVICE = new AuthService();