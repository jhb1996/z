/* eslint-disable */
<template>
  <div id="app" prop1="777777777">
    <!-- <input placeholder='enter your coupon code' @blur="onCouponApplied"> -->
     <!-- <button v-on:click="onCouponApplied()">'enter your coupon code'</button> -->
     <!-- <button v-on:click="onCouponApplied()">'enter your coupon code'</button> -->
    <!-- <button v-on:click="printProps()">'printProps'</button>
    <h1> {{ myChartData }} </h1>  -->

    <!-- <h1 v-if="props"> screw {{ x }}  end</h1>
    <h1> print f {{ f }} {{ props }} {{ prop1 }} {{ screw }} </h1>
    <h1> {{ getAllScrew() }} </h1> -->
    <h1> Google Trends </h1>
    <GChart
      type="LineChart"
      :data=myChartData
      :options="chartOptions"
    />    
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
//see https://haydenbbickerton.github.io/vue-charts/sets.html and right click => 'view source'
//for more complex examples of how to use google charts
//also https://vuejsexamples.com/google-charts-plugin-for-vue-js/
export default {
  name: "App",
  props: {
    myChartData: {
      type: Array,
      default: 'placeholder'
    },
  },


  components: {
    GChart
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["temp", "will", "overwrite", "temp2"],
        ["will", 1000, 400, 200],
        ["be", 1170, 460, 250],
        ["overwritten", 660, 1120, 300],
        ["temp3", 1030, 1000, 1000]
      ],
      chartOptions: {
        chart: {
          title: "Google Trends",
          subtitle: "shopping trends past 90 days"
        },

      }
    };
  },
  methods: {
    printProps(){
      // alert('printProps pressed')
      console.log('this',this);
      console.log('this._props', this._props);
    },
  },
};
</script>
