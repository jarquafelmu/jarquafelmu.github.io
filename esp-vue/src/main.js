import Vue from 'vue'
import App from './App.vue';
import bs from 'bootstrap/dist/js/bootstrap.bundle';

import './styles.scss'

Vue.config.productionTip = false
export const bus = new Vue();
export const bootstrap = bs;

new Vue({
  render: h => h(App),
}).$mount(`#app`)
