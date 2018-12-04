/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './AppScrew'
import router from './router'

Vue.config.productionTip = false

// Vue.component('coupon', { 
//   template: '<input>'
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  myData: 'dddddddddddddd',  //{some_test_data: 'someTestData'},
  methods: {
    myFunc: function (event) {
      // `this` inside methods points to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    },
    onCouponApplied2 () {
      alert('coupon applied')
    }
  }

})

