<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { useAuth } from '../composition/useAuth'
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { editProfile, editProfilePhoto } from '../services/auth';
import Loader from '../components/Loader.vue';

const { user, userLoading } = useAuth();

const {
    editData,
    editing,
    editingLoading,
    handleEditShow,
    handleEditHide,
    handleEditForm,
} = useProfileEdit(user);

const {
    editingPhoto,
    editingPhotoLoading,
    photoData,
    handlePhotoFormShow,
    handlePhotoFormeHide,
    handlePhotoFormSubmit,
    handlePhotoChange,
} = usePhotoEdit();


function usePhotoEdit() {
    const editingPhoto = ref(false);
    const editingPhotoLoading = ref(false);
    const photoData = ref({
        file: null,
        preview: null,
    });

    function handlePhotoFormShow() {
        editingPhoto.value = true;
    }

    function handlePhotoFormeHide() {
        editingPhoto.value = false;
    }

    async function handlePhotoFormSubmit() {
        editingPhotoLoading.value = true;

        try {
            await editProfilePhoto(photoData.value.file);
        } catch (error) {
            console.error('Error:', error)
        }
        editingPhotoLoading.value = false;

    }

    async function handlePhotoChange(event) {
        photoData.value.file = event.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', function() {
            photoData.value.preview = reader.result;
        })

        reader.readAsDataURL(photoData.value.file);
    }

    return {
        editingPhoto,
        editingPhotoLoading,
        photoData,
        handlePhotoFormShow,
        handlePhotoFormeHide,
        handlePhotoFormSubmit,
        handlePhotoChange,
    }
}

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
    <template v-if="!userLoading">
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-black mb-4 text-center">Mi perfil</h1>

            <template class="flex" v-if="!editing && !editingPhoto">
                <template class="flex flex-col items-center">
                    <div class="flex flex-col items-center">
                      
                        <img v-if="user.photoURL" :src="user.photoURL" alt="Foto del perfil" class="w-[150px] h-[150px] rounded-full" style="object-fit: cover;">
                        <img v-else src="public/user.png" alt="Sin foto del perfil" class="w-[150px] h-[150px] rounded-full" style="object-fit: cover;">
                        <button
                            class="bg-white p-1 rounded-full -mt-8"
                            @click="handlePhotoFormShow"
                            >
                            {{user.photoURL ? 'Actualizar' : 'Cargar'}}
                        </button>
     
                    </div>
                    <div class="mt-5">
                        <p class="font-bold">Email</p>
                        <p class="mb-2">{{ user.email }}</p>
                        <p class="font-bold">Nombre</p>
                        <p class="mb-2">{{ user.displayName || 'No especificado' }}</p>
                        <p class="font-bold">Rol</p>
                        <p>{{ user.role || 'Usuario estándar' }}</p>
                        <BaseButton
                        @click="handleEditShow"
                        >Editar mis datos</BaseButton>
                    </div>
                </template>
            </template>

            <template v-else-if="editing">
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
            <template v-else>
                <form
                action="#"
                method="post"
                @submit.prevent="handlePhotoFormSubmit"
                >
                    <div class="flex flex-col">
                        <BaseLabel for="newPhoto">Foto de Perfil</BaseLabel>
                        <input
                            type="file"
                            id="newPhoto"
                            :disabled="editingPhotoLoading"
                            @change="handlePhotoChange"
                        />
                    </div>

                    <div v-if="photoData.preview !== null" class="container">
                        <p>Previsualización de la foto seleccionada</p>
                        <img :src="photoData.preview" alt="Foto de prefil" class="mt-3 m-auto" style="width: 200px; height: 200px;">
                    </div>
                        <BaseButton
                        :loading="editingPhotoLoading"
                        >Actualizar foto
                        </BaseButton>

                        <BaseButton
                        @click="handlePhotoFormeHide"
                        >Cancelar
                        </BaseButton>
                </form>
            </template>
        </div>
    </template>
    <template v-else>
        <Loader></Loader>
    </template>
</template>
