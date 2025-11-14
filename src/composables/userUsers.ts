import { ref, onMounted } from 'vue';
import { USER_SERVICE } from '@/services/user_service';
import type { User, UserModel } from '@/models/user';

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      users.value = await USER_SERVICE.getAll();
      console.log('VALUE',users.value);      
    } catch (err: any) {
      error.value = err.message || 'Error al cargar usuarios';
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadUsers);

  return {
    users,
    loading,
    error,
    loadUsers,
  };
}
