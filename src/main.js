import Vue from 'vue'
import App from './App.vue'
import ball from './components/ball'
Vue.use(ball)
new Vue({
  el: '#app',
  render: h => h(App)
})
