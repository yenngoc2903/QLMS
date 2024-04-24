import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from "./router";
import store from './store';
const isLoggedIn = localStorage.getItem('isLoggedIn');
const user = JSON.parse(localStorage.getItem('user'));

if (isLoggedIn) {
  store.commit('login', user);
}
createApp(App).use(router).use(store).mount('#app');