// stores/alertStore.js
import { defineStore } from 'pinia'

interface alert {
    id:number,
    message:string,
    type:string,
    duration:number
}
export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Array<alert> // Array para manejar múltiples alertas
  }),

  actions: {
    // Agregar una nueva alerta
    addAlert({ message='', type = 'error', duration = 5000 }) {
      const id = Date.now() + Math.random()
      
      this.alerts.push({
        id,
        message,
        type, // 'success', 'error', 'warning', 'info'
        duration
      })

      // Auto-remover después del duration
      if (duration > 0) {
        setTimeout(() => {
          this.removeAlert(id)
        }, duration)
      }

      return id
    },

    // Remover alerta específica
    removeAlert(id:number) {
      const index = this.alerts.findIndex(alert => alert.id === id)
      if (index > -1) {
        this.alerts.splice(index, 1)
      }
    },

    // Limpiar todas las alertas
    clearAlerts() {
      this.alerts = []
    },

    // Métodos de conveniencia
    success(message: string, duration?: number) {
      return this.addAlert({ message, type: 'success', duration })
    },

    error(message: string, duration?: number) {
      return this.addAlert({ message, type: 'error', duration })
    },

    warning(message: string, duration?: number) {
      return this.addAlert({ message, type: 'warning', duration })
    },

    info(message: string, duration?: number) {
      return this.addAlert({ message, type: 'info', duration })
    }
  }
})