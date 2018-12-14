/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import googleChartVue from '@/components/googleChartVue'
import listProductsVue from '@/components/listProductsVue'
import productBox from '@/components/productBox'
// import App from '../App'

//this step is needed for the component to be recognized in the main App.vue. Don't need to do this if the component is being displayed using the router view
Vue.component('listProductsVue', listProductsVue)
Vue.component('productBox', productBox)


Vue.use(Router)

console.log('google charts vue', googleChartVue)
googleChartVue.propsHard = {mProps1: 'mProps 1 str'}



export default new Router({
  mode: 'history',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        // default: Default,
        googleChartVue: googleChartVue,
        productBox: productBox,
        listProductsVue: listProductsVue,
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

