import { createApp } from 'vue';
import '@/assets/index.css';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(MotionPlugin).mount('#app')
