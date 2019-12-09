import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//在一启动main.js的时候就安装好toast封装的插件
import toast from 'components/common/toast'
//解决移动端的300毫秒延迟
//解决300毫秒延迟1.引入fastclick插件
import FastClick from 'fastclick'
//图片懒加载1.引入vue-lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
//Vue.prototype声明的变量，实际上是为Vue对象添加了一个原型属性，
Vue.prototype.$bus = new Vue()
//解决300毫秒延迟2.使用
FastClick.attach(document.body)
//图片懒加载2.使用
Vue.use(VueLazyLoad,{
	loading:require('./assets/img/common/placeholder.png')
})
//安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
	router,
	store
}).$mount('#app')
