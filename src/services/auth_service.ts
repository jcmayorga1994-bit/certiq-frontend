import { BaseService } from './base';
import { User } from '@/models/user';

interface Auth {
  email: string;
  password: string;
}

interface ResponseAuth {
  message: string;
  success: string;
  token: string;
  user: User;
}

interface ResponseRegister {
  success: string;
  token: string;
  user: User;
  token_type: string;
}

interface ResponseMe {
  success: string;
  user: User;
}

class AuthService extends BaseService<User>() {
  static get entity(): string {
    return 'auth';
  }

  static async register(user: Omit<User, 'id'>): Promise<ResponseRegister> {
    try {
      return await this.submit<ResponseRegister>({
        method: 'post',
        path: `/public/${this.entity}/register`,
        data: user,
        isFullPath: true,
      });
    } catch (error) {
      this.handleApiError(error, 'registrar usuario');
    }
  }

  static async login(auth: Auth): Promise<ResponseAuth> {
    try {
      return await this.submit<ResponseAuth>({
        method: 'post',
        path: `/public/${this.entity}/login`,
        data: auth as any,
        isFullPath: true,
      });
    } catch (error) {
      this.handleApiError(error, 'iniciar sesión');
    }
  }

  static async me(): Promise<ResponseMe> {
    try {
      return await this.submit<ResponseMe>({
        method: 'get',
        path: `/${this.entity}/me`,
        isFullPath: true,
      });
    } catch (error) {
      this.handleApiError(error, 'obtener usuario actual');
    }
  }

  static async logout(): Promise<any> {
    try {
      return await this.submit<any>({
        method: 'get',
        path: `/${this.entity}/logout`,
        isFullPath: true,
      });
    } catch (error) {
      this.handleApiError(error, 'cerrar sesión');
    }
  }
}

export default AuthService;