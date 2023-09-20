import { createApp } from "vue";
import App from "./src/App.vue";
import './src/main.css';
import router from './src/router/router'

const app = createApp(App);

app.use(router);

app.mount('#app');