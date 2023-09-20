<script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat.js";

export default {
    name: "Chat",
    data() {
        return {
            messages: [],
            newMessage: {
                user: '',
                message: '',
            }
        }
    },

    methods: {
        sendMessage() {
            chatSaveMessage({
                user: this.newMessage.user,
                message: this.newMessage.message,
                // ...this.newMessage // Podríamos haberlo escrito así, también.
            })
                .then(() => {
                    this.newMessage.message = '';
                });
        }
    },

    mounted() {
        chatSubscribeToMessages(messages => {
            this.messages = messages;
        });
    }
};
</script>

<template>
    <h1 class="text-3xl font-black mb-4">TP 1</h1>

    <p class="mb-3">Leyendo los mensajes del chat, ahora en tiempo real</p>

    <div class="flex gap-5 justify-between">

        <form
            action="#"
            @submit.prevent="sendMessage"
        >
            <div class="mb-2">
                <label class="block font-bold" for="user">Usuario</label>
                <input class="border border-blue-500 rounded p-1"
                    type="text"
                    id="user"
                    v-model="newMessage.user"
                >
            </div>
            <div class="mb-2">
                <label class="block font-bold" for="message">Mensaje</label>
                <textarea class="border border-blue-500 rounded p-1"
                    id="message"
                    v-model="newMessage.message"
                ></textarea>
            </div>
            <button class="my-3 py-1 px-3 rounded w-full bg-blue-700 text-white" type="submit">Enviar</button>
        </form>

        <div>
            <div class="mb-3" v-for="message in messages">
                <div><b>Usuario:</b> {{ message.user }}</div>
                <div><b>Mensaje:</b> {{ message.message }}</div>
            </div>
            </div>
    </div>
</template>
