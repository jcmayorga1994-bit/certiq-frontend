// import { ref, onMounted } from 'vue';
// import { userService } from '@/services/user.service';
// import type { UserModel } from '@/models/user';

// export function useUsers() {
//   const users = ref<UserModel[]>([]);
//   const loading = ref(false);
//   const error = ref<string | null>(null);

//   const loadUsers = async () => {
//     loading.value = true;
//     error.value = null;
//     try {
//       users.value = await userService.getAll();
//     } catch (err: any) {
//       error.value = err.message || 'Error al cargar usuarios';
//     } finally {
//       loading.value = false;
//     }
//   };

//   onMounted(loadUsers);

//   return {
//     users,
//     loading,
//     error,
//     loadUsers,
//   };
// }
