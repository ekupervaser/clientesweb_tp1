import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToAuth } from './../services/auth';
import { getUserProfileById } from '../services/user';

export function useAuth() {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        role: null,
    });
    const loading = ref(true);
    let unsubscribeAuth;

    onMounted(() => {
        unsubscribeAuth = subscribeToAuth(async (newUser) => {
            if (newUser) {
                // Si hay un usuario autenticado, obtén información adicional desde Firestore
                const userProfile = await getUserProfileById(newUser.id);
                user.value = { ...userProfile };
            } else {
                // Usuario no autenticado, restablece los valores
                user.value = {
                    id: null,
                    email: null,
                    displayName: null,
                    role: null,
                };
            }
            loading.value = false;
        });
    });

    onUnmounted(() => unsubscribeAuth());

    return {
        user,
        loading,
    }
}