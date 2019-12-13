import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './util/http'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import '@/assets/globalCss.css'

// 全局组件
import globalComponent from '@/util/globalComponent'
Vue.use(globalComponent);

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.axios = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
