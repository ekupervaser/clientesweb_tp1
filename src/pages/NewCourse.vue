<script>
import { SaveNewCourse } from '../services/panel';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import { subscribeToAuth } from "../services/Auth";

export default {
    name: 'NewCourse',
    components: { BaseButton, BaseInput, BaseLabel, BaseTextarea },
    data() {
        return {
            isLoading: true, 
            courses: [],
            isSaving: false,
            newCourse: {
               name: '',
               description: '',
               price: '',
            },
       }
    },
    methods: {
        saveCourse() {
            if(this.isSaving) return;
            this.isSaving = true;
            SaveNewCourse({
                name: this.newCourse.name,
                description: this.newCourse.description,
                price: this.newCourse.price,
            })
            this.$router.push("/panel");
        },
    },
}
</script>

<template>
    <div class="max-w-screen-sm flex flex-col justify-center m-auto">
    <h1 class="text-3xl font-black mb-4 text-center">Cargar nuevo curso</h1>

    <p class="font-black mb-4">Agrega el ítem a continuación</p>

    <form action="#"
    @submit.prevent="saveCourse"
    >
            <div>
                <BaseLabel for="name">Nombre</BaseLabel>
                <BaseInput 
                id="name"
                v-model="newCourse.name"/>
            </div>
            <div>
                <BaseLabel for="description">Descripción</BaseLabel>
                <BaseTextarea 
                id="description"
                v-model="newCourse.description"/>
            </div>
            <div>
                <BaseLabel for="price">Precio</BaseLabel>
                <BaseInput 
                id="price"
                v-model="newCourse.price"/>
            </div>
            <BaseButton type="submit">Cargar curso</BaseButton>
        </form>
    </div>
</template>