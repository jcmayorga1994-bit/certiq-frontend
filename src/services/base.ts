import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '@/store/auth'; // Asegúrate de que este path sea correcto
import { useAlertStore } from '@/store/alert';

interface ErrorData {
  message?: string;
  errors?: Record<string, string[] | string>; // Para errores de validación (422)
  // Añade cualquier otro campo que tu API devuelva en caso de error
  [key: string]: any; 
}
class BaseService {
  protected api: AxiosInstance;

  constructor(baseURL: string = process.env.VUE_APP_API_URL) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 🔒 Interceptor de Solicitud: Incluir token JWT
    this.api.interceptors.request.use((config) => {
      // Usar la store para obtener el token
      const authStore = useAuthStore();
      const token = authStore.token;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const authStore = useAuthStore();
        const alertStore = useAlertStore()

        // Manejar diferentes tipos de errores
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          const response = error.response as AxiosResponse<ErrorData>;
          const { status, data } = response

          switch (status) {
            case 400:
              alertStore.error(data.message || 'Solicitud incorrecta')
              break

            case 401:
              alertStore.error('No autorizado. Por favor, inicia sesión nuevamente.')
              authStore.logout();
              window.location.href = '/'
              localStorage.removeItem('token')
              break

            case 403:
              alertStore.error('No tienes permisos para realizar esta acción')
              break

            case 404:
              alertStore.error('Recurso no encontrado')
              break

            case 422:
              // Errores de validación
              if (data.errors) {
                // Mostrar el primer error de validación
                const firstError = Object.values(data.errors)[0]
                alertStore.error(Array.isArray(firstError) ? firstError[0] : firstError)
              } else {
                alertStore.error(data.message || 'Error de validación')
              }
              break

            case 429:
              alertStore.warning('Demasiadas solicitudes. Por favor, espera un momento.')
              break

            case 500:
              alertStore.error('Error interno del servidor. Por favor, intenta más tarde.')
              break

            case 503:
              alertStore.error('Servicio no disponible. Por favor, intenta más tarde.')
              break

            default:
              alertStore.error(data.message || `Error: ${status}`)
          }
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió respuesta
          alertStore.error('No se pudo conectar con el servidor. Verifica tu conexión.')
        } else {
          // Algo sucedió al configurar la solicitud
          alertStore.error('Error al procesar la solicitud')
        }
      }
    );
  }

  // 🆕 MÉTODO COMPARTIDO DE MANEJO DE ERRORES
  protected handleApiError(error: unknown, entityName: string, action: string): void {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      // Logueo más detallado para la consola
      console.error(`[${entityName}Service Error] Fallo al ${action}. HTTP Status: ${status || 'N/A'}`,
        error.response?.data || error.message);

      // Aquí podrías añadir un sistema de notificación global si lo tuvieras:
      // const authStore = useAuthStore();
      // authStore.notifyUser(`Error al ${action}: ${error.response?.data.message || 'Error de servicio'}`);

      // Opcional: Relanzar un error más amigable para el frontend
      throw new Error(`Operación fallida en el servicio de ${entityName}.`);

    } else {
      console.error(`[${entityName}Service Error] Error desconocido al ${action}:`, error);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }
}

export default BaseService;