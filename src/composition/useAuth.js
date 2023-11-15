import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToAuth } from './../services/auth';
import { getUserProfileById } from '../services/user';

export function useAuth() {
    const userLoading = ref(true);
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        role: null,
    });
    let unsubscribeAuth;

    onMounted(() => {
        unsubscribeAuth = subscribeToAuth(async (newUser) => {
            if (newUser) {
                userLoading.value = true;
                const userProfile = await getUserProfileById(newUser.id);
                user.value = { ...userProfile };
                userLoading.value = false;
            }
        });
    });

    onUnmounted(() => unsubscribeAuth());

    return {
        user,
        userLoading
    }
}