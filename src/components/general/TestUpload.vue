<!-- views/SubirLeccion.vue -->
<template>
    <div class="upload-container">
        <h1>Subir Nueva Lección</h1>

        <form @submit.prevent="subirLeccion">
            <div>
                <label>Título:</label>
                <input v-model="titulo" required />
            </div>

            <div>
                <label>Archivo HTML:</label>
                <input type="file" accept=".html" @change="handleHTMLChange" required />
            </div>

            <div>
                <label>Imágenes (selecciona múltiples):</label>
                <input type="file" accept="image/*" multiple @change="handleImagenesChange" required />
                <p v-if="imagenes.length">{{ imagenes.length }} imágenes seleccionadas</p>
            </div>

            <button type="submit" :disabled="uploading">
                {{ uploading ? 'Subiendo...' : 'Subir Lección' }}
            </button>
        </form>

        <div v-if="resultado" :class="resultado.success ? 'success' : 'error'">
            {{ resultado.message }}
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const titulo = ref('')
const archivoHTML = ref(null)
const imagenes = ref([])
const uploading = ref(false)
const resultado = ref(null)
const handleHTMLChange = (e) => {
    archivoHTML.value = e.target.files[0]
}

const handleImagenesChange = (e) => {
    imagenes.value = Array.from(e.target.files)
}

const subirLeccion = async () => {
    uploading.value = true
    resultado.value = null

    try {
        const formData = new FormData()
        formData.append('lesson_id', 1)
        formData.append('content_type', 'test')
        formData.append('content_url', 'test')
        formData.append('content_text', 'test')
        formData.append('duration', 10000)
        formData.append('language', 'test')

        formData.append('titulo', titulo.value)        
        formData.append('html', archivoHTML.value)
        
        // Agregar todas las imágenes
        imagenes.value.forEach(img => {
            console.log('FORMDATA', img);
            formData.append('imagenes[]', img);
        })

        const api = axios.create({
            baseURL: process.env.VUE_APP_API_URL
        });

        const response = await api.post('/lessoncontent', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        });


        const data = await response.json()

        if (data.success) {
            resultado.value = {
                success: true,
                message: `¡Lección subida! ID: ${data.leccionId}`
            }
            // Limpiar formulario
            titulo.value = ''
            archivoHTML.value = null
            imagenes.value = []
        } else {
            throw new Error(data.error)
        }

    } catch (error) {
        resultado.value = {
            success: false,
            message: `Error: ${error.message}`
        }
    } finally {
        uploading.value = false
    }
}
</script>