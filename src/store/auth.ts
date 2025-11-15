// stores/auth.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { User } from '@/models/user'
import { AUTH_SERVICE } from '@/services/auth_service'

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    }),

    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        isLoggedIn: (state) => state.isAuthenticated,
    },

    actions: {
        async login(email: string, password: string) {
            try {
                const response = await AUTH_SERVICE.login({
                    email,
                    password,
                })

                if (response.data.success) {
                    this.token = response.data.token
                    this.user = response.data.user
                    this.isAuthenticated = true

                    // Guardar en localStorage
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user))

                    // Configurar axios para usar el token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

                    return { success: true }
                }
            } catch (error: any) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Error al iniciar sesión',
                }
            }
        },

        async register(data: { name: string; email: string; password: string; password_confirmation: string }) {
            try {
                const response = await AUTH_SERVICE.register(data);
                if (response.data.success) {
                    this.token = response.data.token
                    this.user = response.data.user
                    this.isAuthenticated = true

                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

                    return { success: true }
                }
            } catch (error: any) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Error al registrarse',
                }
            }
        },
        async logout() {
            try {
                await AUTH_SERVICE.logout();
            } catch (error) {
                console.error('Error al cerrar sesión:', error)
            } finally {
                // Limpiar estado y localStorage
                this.token = null
                this.user = null
                this.isAuthenticated = false
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                delete axios.defaults.headers.common['Authorization']
            }
        },
        async fetchUser() {
            try {
                const response = await AUTH_SERVICE.me();
                if (response.data.success) {
                    this.user = response.data.user
                    this.isAuthenticated = true
                    return { success: true }
                }
            } catch (error) {
                this.logout()
                return { success: false }
            }
        },

        // Restaurar sesión desde localStorage
        initAuth() {
            const token = localStorage.getItem('token')
            const userString = localStorage.getItem('user')

            if (token && userString) {
                this.token = token
                this.user = JSON.parse(userString)
                this.isAuthenticated = true
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
        },
    },
})