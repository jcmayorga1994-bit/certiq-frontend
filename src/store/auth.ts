// stores/auth.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { User } from '@/models/user'
import AuthService from '@/services/auth_service'

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
        async login({ email, password }: { email: string; password: string }) {
            try {
                const response = await AuthService.login({
                    email,
                    password,
                })                
                if (response.success) {
                    this.token = response.token
                    this.user = response.user
                    this.isAuthenticated = true

                    // Guardar en localStorage
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('user', JSON.stringify(response.user))

                    // Configurar axios para usar el token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`

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
                const response = await AuthService.register(data);
                if (response.success) {
                    this.token = response.token
                    this.user = response.user
                    this.isAuthenticated = true

                    localStorage.setItem('token', response.token)
                    localStorage.setItem('user', JSON.stringify(response.user))
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`

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
                await AuthService.logout();
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
                const response = await AuthService.me();
                if (response.success) {
                    this.user = response.user
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