import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App1.vue'

//声明使用插件
Vue.use(VueResource)

new Vue({
  el:"#app",
  components:{App},   //映射标签
  template:'<App/>'  //模板
})
