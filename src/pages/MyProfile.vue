<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { useAuth } from '../composition/useAuth'
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { editProfile } from '../services/auth';
import Loader from '../components/Loader.vue';

const { user, loading } = useAuth();

const {
    editData,
    editing,
    editingLoading,
    handleEditShow,
    handleEditHide,
    handleEditForm,
} = useProfileEdit(user);

function useProfileEdit(user) {
    const editing = ref(false);
    const editingLoading = ref(false);
    const editData = ref({
        displayName: '',
    });

async function handleEditForm() {
    try {
        editingLoading.value = true;
        await editProfile({
            displayName: editData.value.displayName,
    });

    } catch(error) {

    }
    editingLoading.value = false;
}

function handleEditShow() {
    editData.value.displayName = user.value.displayName;
    editing.value = true;
}

function handleEditHide() {
    editing.value = false;
}

return {
    editData,
    editing,
    editingLoading,
    handleEditShow,
    handleEditHide,
    handleEditForm,
}
}
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-3xl font-black mb-4 text-center">Mi perfil</h1>

        <template v-if="!editing">

            <template v-if="loading">
                <Loader></Loader>
            </template>

            <template v-else>
                <div>
                <img src="../../public/user.png" alt="" class="max-w-[150px]">
            </div>
            <div class="mt-5">
                <p class="font-bold">Email</p>
                <p>{{ user.email }}</p>
                <p class="font-bold">Nombre</p>
                <p>{{ user.displayName || 'No especificado' }}</p>
                <p class="font-bold">Rol</p>
                <p>{{ user.role || 'Usuario estándar' }}</p>
            </div>
            
            <BaseButton
            @click="handleEditShow"
            >Editar mis datos</BaseButton>
            </template>

        </template>

        <template v-else>
            <form
            action="#"
            method="post"
            @submit.prevent="handleEditForm"
            >
                <div>
                    <BaseLabel for="displayName">Nombre</BaseLabel>
                    <BaseInput
                    id="displayName"
                    :disabled="editingLoading"
                    v-model="editData.displayName"
                    >
                    </BaseInput>
                </div>

            <BaseButton
            :loading="editingLoading"
            >Actualizar mis datos
            </BaseButton>

            <BaseButton
            @click="handleEditHide"
            >Cancelar
            </BaseButton>
            </form>

        </template>
    </div>
</template>
