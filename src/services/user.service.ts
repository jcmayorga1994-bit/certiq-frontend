import BaseService from './base';
import { User, UserModel } from '@/models/user';

class UserService extends BaseService {
  constructor() {
    super(); // usa el baseURL configurado
  }

  async getAll(): Promise<UserModel[]> {
    const data = await this.get<User[]>('/users');
    return data.map((u) => new UserModel(u));
  }

  async getById(id: number): Promise<UserModel> {
    const data = await this.get<User>(`/users/${id}`);
    return new UserModel(data);
  }

  async create(user: Omit<User, 'id'>): Promise<UserModel> {
    const data = await this.post<User>('/users', user);
    return new UserModel(data);
  }

  async update(id: number, user: Partial<User>): Promise<UserModel> {
    const data = await this.put<User>(`/users/${id}`, user);
    return new UserModel(data);
  }

  async remove(id: number): Promise<void> {
    await this.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
