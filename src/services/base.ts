import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '@/store/auth';
import { useAlertStore } from '@/store/alert';

interface ErrorData {
  message?: string;
  errors?: Record<string, string[] | string>;
  [key: string]: any;
}

interface SubmitInterface<TResponse, TRequest = unknown> {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  data?: TRequest | Record<string, unknown> | FormData | null;
  config?: AxiosRequestConfig | null;
  isFullPath?: boolean;
}

// BaseService es una función genérica que retorna una clase
export function BaseService<T>() {
  abstract class BaseService {
    private static apiInstance: AxiosInstance | null = null;

    static get entity(): string {
      throw new Error('entity getter not defined');
    }

    static get baseURL(): string {
      return process.env.VUE_APP_API_URL || '';
    }

    // Obtener o crear instancia de axios
    private static getApi(): AxiosInstance {
      if (!this.apiInstance) {
        this.apiInstance = axios.create({
          baseURL: this.baseURL,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.setupInterceptors();
      }
      return this.apiInstance;
    }

    private static setupInterceptors(): void {
      const api = this.apiInstance!;

      // Interceptor de solicitud: Incluir token JWT
      api.interceptors.request.use((config) => {
        const authStore = useAuthStore();
        const token = authStore.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      // Interceptor de respuesta: Manejo de errores
      api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          const authStore = useAuthStore();
          const alertStore = useAlertStore();

          if (error.response) {
            const response = error.response as AxiosResponse<ErrorData>;
            const { status, data } = response;

            switch (status) {
              case 400:
                alertStore.error(data.message || 'Solicitud incorrecta');
                break;

              case 401:
                alertStore.error('No autorizado. Por favor, inicia sesión nuevamente.');
                authStore.logout();
                window.location.href = '/';
                localStorage.removeItem('token');
                break;

              case 403:
                alertStore.error('No tienes permisos para realizar esta acción');
                break;

              case 404:
                alertStore.error('Recurso no encontrado');
                break;

              case 422:
                if (data.errors) {
                  const firstError = Object.values(data.errors)[0];
                  alertStore.error(Array.isArray(firstError) ? firstError[0] : firstError);
                } else {
                  alertStore.error(data.message || 'Error de validación');
                }
                break;

              case 429:
                alertStore.warning('Demasiadas solicitudes. Por favor, espera un momento.');
                break;

              case 500:
                alertStore.error('Error interno del servidor. Por favor, intenta más tarde.');
                break;

              case 503:
                alertStore.error('Servicio no disponible. Por favor, intenta más tarde.');
                break;

              default:
                alertStore.error(data.message || `Error: ${status}`);
            }
          } else if (error.request) {
            alertStore.error('No se pudo conectar con el servidor. Verifica tu conexión.');
          } else {
            alertStore.error('Error al procesar la solicitud');
          }

          return Promise.reject(error);
        }
      );
    }

    /**
     * Método compartido de manejo de errores
     * Útil para logging específico o manejo personalizado en servicios heredados
     */
    protected static handleApiError(error: unknown, action: string): never {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Logging detallado para la consola
        console.error(
          `[${this.entity}Service Error] Fallo al ${action}. HTTP Status: ${status || 'N/A'}`,
          error.response?.data || error.message
        );

        // Relanzar un error más específico para el frontend
        throw new Error(`Operación fallida al ${action} en ${this.entity}.`);
      } else {
        console.error(`[${this.entity}Service Error] Error desconocido al ${action}:`, error);
        throw error;
      }

    }

    /**
     * Método principal para realizar peticiones AJAX
     */
    static async submit<TResponse, TRequest = unknown>(
      submitData: SubmitInterface<TResponse, TRequest>
    ): Promise<TResponse> {
      try {
        const api = this.getApi();
        const path = submitData.isFullPath ? submitData.path : `${this.entity}/${submitData.path}`;

        let response: AxiosResponse;

        switch (submitData.method) {
          case 'get':
            response = await api.get(path, submitData.config || undefined);
            break;
          case 'post':
            response = await api.post(path, submitData.data, submitData.config || undefined);
            break;
          case 'put':
            response = await api.put(path, submitData.data, submitData.config || undefined);
            break;
          case 'delete':
            response = await api.delete(path, submitData.config || undefined);
            break;
        }

        return response.data;
      } catch (error: any) {
        console.error(`[${this.entity}Service Error]:`, error);
        throw error;
      }
    }

    /**
     * ----------------------------
     * MÉTODOS CRUD BÁSICOS
     * ----------------------------
     */

    static async getAll(): Promise<T[]> {
      return this.submit({
        method: 'get',
        path: this.entity,
        isFullPath: true,
      });
    }

    static async getById(id: number): Promise<T> {
      return this.submit({
        method: 'get',
        path: `${id}`,
      });
    }

    static async create(data: T | FormData, config?: AxiosRequestConfig): Promise<T> {
      return this.submit({
        method: 'post',
        path: this.entity,
        data: data,
        config: config,
        isFullPath: true,
      });
    }

    static async update(id: number, data: T): Promise<T> {
      return this.submit({
        method: 'put',
        path: `${id}`,
        data: data,
      });
    }

    static async remove(id: number): Promise<T> {
      return this.submit({
        method: 'delete',
        path: `${id}`,
      });
    }

    static async getTrash(): Promise<T[]> {
      return this.submit({
        method: 'get',
        path: 'trash',
      });
    }

    static async restore(id: number): Promise<T> {
      return this.submit({
        method: 'delete',
        path: `activate/${id}`,
      });
    }
  }

  return BaseService;
}

export default BaseService;