import BaseService from './base';
import { User, UserModel } from '@/models/user';

class AuthService extends BaseService {
  private readonly ENTITY_NAME = 'auth';

  constructor() {
    super(); // usa el baseURL configurado
  }

  async register(user: Omit<User, 'id'>): Promise<UserModel> {
    const data = await this.post<User>(`/public/${this.ENTITY_NAME}/register`, user);
    return new UserModel(data);
  }
  async login(): Promise<User[]> {
    const data = await this.get<User[]>(`/public/${this.ENTITY_NAME}/login`);
    return data;
  }
}

export const AUTH_SERVICE = new AuthService();