import { createApp } from 'vue';
import Dev from './serve.vue';
import "../src/assets/css/flex.css"
import "../src/assets/css/reset.css"
import "../src/assets/css/irregulars.css"
import Vuebsolutely from '@/entry.esm';


const app = createApp(Dev);
app.use(Vuebsolutely);

app.mount('#app');
