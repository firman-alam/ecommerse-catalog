import Vue from 'vue';
import App from './App.vue';
import './assets/styles/reset.css';
import './assets/styles/page.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
