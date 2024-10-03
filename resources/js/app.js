import './bootstrap';

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './Plugins/vuetify.js'
import store from './store'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdLogoutTwotone } from "oh-vue-icons/icons";
import { MdDelete } from "oh-vue-icons/icons";
import { FaRegularEdit } from "oh-vue-icons/icons";

addIcons(MdLogoutTwotone)
addIcons(MdDelete)
addIcons(FaRegularEdit)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.component('v-icon', OhVueIcon)

app.mount('#app')
