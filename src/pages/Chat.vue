<script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat.js";
import { dateToString } from '../helpers/date'
import BaseButton from "../components/BaseButton.vue"
import BaseInput from "../components/BaseInput.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import BaseLabel from "../components/BaseLabel.vue"
import Loader from "../components/Loader.vue";
import { subscribeToAuth } from "../services/Auth";

export default {
    name: "Chat",
    components: { BaseButton, BaseInput, BaseTextarea, BaseLabel, Loader },
    data() {
        return {
            isLoading: true, 
            messages: [],
            isSaving: false,
            newMessage: {
                message: '',
            },
            user: {
                id: null,
                email: null,
            },
            unsubscribeAuth: () => {},
            unsubscribeChat: () => {},
        }
    },

    methods: {
        sendMessage() {
            if(this.isSaving) return;
            this.isSaving = true;
            chatSaveMessage({
                user: this.user.email,
                message: this.newMessage.message,
            })
                .then(() => {
                    this.newMessage.message = '';
                    this.isSaving = false;
                });
        },

        formatDate(date) {
            return dateToString(date);
        }
    },

    mounted() {
        this.isLoading = true;
        this.unsubscribeChat = chatSubscribeToMessages(messages => {
            this.messages = messages;
            this.isLoading = false;
        });
        this.unsubscribeAuth = subscribeToAuth(newUser => this.user = {...newUser});
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeChat();
    }
};
</script>

<template>
    <h1 class="text-3xl font-black mb-4">TP 1</h1>

    <p class="mb-3">Leyendo los mensajes del chat en tiempo real</p>

    <div class="flex gap-5 justify-between">

        <form
            action="#"
            @submit.prevent="sendMessage"
        >
            <div class="mb-2">
                <p class="mb-2 font-bold">Usuario</p>
                <p>{{ user.email }}</p>
            </div>
            <div class="mb-2">
                <BaseLabel for="message">Mensaje</BaseLabel>
               <BaseTextarea
                    id="message"
                    v-model="newMessage.message"
                ></BaseTextarea>
            </div>
            <BaseButton
            :loading="isSaving"
            ></BaseButton>
       </form>

        <div>
            <div v-if="!isLoading">
                <div class="mb-3" v-for="message in messages"
                key="message.id"
                >
                    <div><b>Usuario:</b> {{ message.user }}</div>
                    <div><b>Mensaje:</b> {{ message.message }}</div>
                    <div class="text-right">{{ formatDate(message.created_at) }}</div>
                </div>
            </div>
        <div v-else><Loader /></div>
    </div>
</div>
</template>
