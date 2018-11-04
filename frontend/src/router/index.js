/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import googleChartVue from '@/components/googleChartVue'
import Paypal from '@/components/Paypal'
import myComp from '@/components/myComp'
import myComp2 from '@/components/myComp2'


import App from '../App'


const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const coupon = { template: '<input>' }

function dynamicProps () {
  console.log('dynamic props:')
  var screwVariable = 'dynamicfiller'
  // console.log('googleChartVue', googleChartVue)
  console.log('App', App)
  // console.log('App', Appx.screw)
  // console.log('App', App.data().screw)
  console.log(App.data())
  screwVariable = App.data //App.data().screw
  // screwVariable = t.a

  return {
    prop1: 'testProp1',
    prop2: 'testProp2',
    screw: App.data().screw,
    allData: 'ss',
    prop3: 'testProp3'
  }
}

Vue.use(Router)

console.log('google charts vue', googleChartVue)
googleChartVue.propsHard = {mProps1: 'mProps 1 str'}

// Vue.component('coupon', { 
//   template: '<input>'
// })

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        coupon: coupon,
        googleChartVue: googleChartVue,
        paypalView: Paypal,
        myComp: myComp,
        myComp2: myComp2
      },
      // props: { googleChartVue: dynamicProps, myComp: dynamicProps(), myComp2: dynamicProps()}

      // props: { default: dynamicProps(this), coupon: dynamicProps(this), googleChartVue: dynamicProps(this), paypalView: dynamicProps(this) }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})
// ({
//   routes: [
//     {
//       path: '/',
//       name: 'Paypal',
//       component: Paypal
//     },
//     {
//       path: '/',
//       name: 'googleChartVue',
//       component: googleChartVue
//     }
//   ]
// })
