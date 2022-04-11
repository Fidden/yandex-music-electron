import {createApp} from 'vue'
import App from './App.vue'
import store from "./store/store";
import router from "./router/router";
import axios from "axios";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$request = axios.create({
	baseURL: 'https://api.music.yandex.net',
	headers: {
		'Authorization': `OAuth AQAAAABevSUfAAG8Xrt2CZAbxEvSnyBU4FXXcSY`,
		'Accept-Language': 'ru',
	},
});

app.use(store)
app.use(router)
app.mount('#app')
