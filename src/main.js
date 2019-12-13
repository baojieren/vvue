import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/http'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import '@/assets/globalCss.css'
import store from './store'

// 全局组件
// import globalComponent from '@/utils/globalComponent'
// Vue.use(globalComponent);

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.axios = axios;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
