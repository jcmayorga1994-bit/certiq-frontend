import BaseService from './base';
import { User, UserModel } from '@/models/user';

class UserService extends BaseService {
  private readonly ENTITY_NAME = 'user';

  constructor() {
    super(); // usa el baseURL configurado
  }

  async getAll(): Promise<User[]> {
    const data = await this.get<User[]>(`/public/${this.ENTITY_NAME}/index-public`);
    console.log('INDEX', data);

    return data;
  }

  async getById(id: number): Promise<UserModel> {
    const data = await this.get<User>(`/${this.ENTITY_NAME}/${id}`);
    return new UserModel(data);
  }

  async create(user: Omit<User, 'id'>): Promise<UserModel> {
    const data = await this.post<User>(`/${this.ENTITY_NAME}`, user);
    return new UserModel(data);
  }

  async update(id: number, user: Partial<User>): Promise<UserModel> {
    const data = await this.put<User>(`/${this.ENTITY_NAME}/${id}`, user);
    return new UserModel(data);
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/${this.ENTITY_NAME}/${id}`);
  }
}

export const USER_SERVICE = new UserService();
