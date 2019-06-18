/* eslint-disable */
<template>
  <div id="app" prop1="777777777">
    <!-- <button v-on:click="chartTester()">chartTester()</button> -->
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
      default: [
        ["Year", "Sales"],
        ["0001", 1],
        ["0002", 1],
        ["0003", 0],
        ["0004", 1]
      ],
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
        ["will2", 0, 400, 200],
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
    chartTester(name){
      console.log('--tester')
      // console.log('this:',this);
      console.log('this._props.myChartData', this._props.myChartData);
    },
  },
};
</script>
