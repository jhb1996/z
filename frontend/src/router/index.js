/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import googleChartVue from '../components/googleChartVue.vue'

// import App from '../App'


Vue.use(Router)




export default new Router({
  mode: 'history',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        // default: Default,
        googleChartVue: googleChartVue,

      },
     },
    // {
    //   path: '/other',
    //   components: {
    //     default: Baz,
    //     a: Bar,
    //     b: Foo
    //   }
    // }
  ]
})

