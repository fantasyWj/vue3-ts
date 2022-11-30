import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// axios.defaults.baseURL = ''
// console.log(axios.defaults, '2222');

axios.interceptors.request.use((config) => {
    console.log(config, 'axios1111');

})
// .use(Antd)
createApp(App).use(store).use(router).mount('#app')
