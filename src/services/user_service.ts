import BaseService from './base';
import { User } from '@/models/user';

class UserService extends BaseService {
  private readonly ENTITY_NAME = 'user';

  constructor() {
    super(); // usa el baseURL configurado
  }

  async getAll(): Promise<User[]> {
    try {
      const data = await this.get<User[]>(`/${this.ENTITY_NAME}`);
      return data;
    } catch (error) {
      this.handleApiError(error, this.ENTITY_NAME, 'obtener todos los usuarios');
      throw error;
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const data = await this.get<User>(`/${this.ENTITY_NAME}/${id}`);
      return data;
    } catch (error) {
      this.handleApiError(error, this.ENTITY_NAME, `obtener usuario con ID ${id}`);
      throw error;
    }
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      const data = await this.post<User>(`/${this.ENTITY_NAME}`, user);
      return data;
    } catch (error) {
      this.handleApiError(error, this.ENTITY_NAME, 'crear usuario');
      throw error;
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    try {
      const data = await this.put<User>(`/${this.ENTITY_NAME}/${id}`, user);
      return data;
    } catch (error) {
      this.handleApiError(error, this.ENTITY_NAME, 'editar usuario');
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const data = await this.delete<User>(`/${this.ENTITY_NAME}/${id}`);
      return data;
    } catch (error) {
      this.handleApiError(error, this.ENTITY_NAME, 'eliminar usuario');
      throw error;
    }
  }
}

export const USER_SERVICE = new UserService();
