import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.use(toast)

// 使用懒加载的插件
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png')
})

// 解决移动端 300ms 延迟
FastClick.attach(document.body);

// this.$bus 本身是没有值的，需要在这里给他赋一个值
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
