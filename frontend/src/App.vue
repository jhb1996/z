/* eslint-disable */
<template>
  <div id="app">


    <h1>Type anything that you think might be trending</h1>
    <input v-model='searchStr0' placeholder='overwritten'>
    <input v-model='searchStr1' placeholder=''>
    <input v-model='searchStr2' placeholder=''>
    <input v-model='searchStr3' placeholder=''>
    <input v-model='searchStr4' placeholder=''>

    <button v-on:click="getDataFromGoogleTrends()">compare</button>
    <div> 
      <div></div>
      <button v-on:click="tester()">tester()</button>
    </div>
    <h1 v-if="showChart0">Google Trends</h1>
    <router-view v-if="showChart0" class="view two" name="googleChartVue" :myChartData=chartData0></router-view>
    <router-view v-if="showChart1" class="view two" name="googleChartVue" :myChartData=chartData1></router-view>

  </div>
</template>

<script>
export default {
  
  /* eslint-disable */
  name: 'App',

  localData: {//nothing here is accesible accesible outside the innitial loadup
    startingTestVariable: 'startingTestValue'
  },
  data() {
      return {
      searchStr0: 'potato',
      searchStr1: 'unicorn',
      searchStr2: 'frozen',
      searchStr3: 'baseball',
      searchStr4: 'wolf',
      chartData0 : [ //totally unimportant what is here except for testing since in practice the chart data will be updated before the chart is ever displayed
        ["Year", "Sales"],
        ["0001", 1],
        ["0002", 1],
        ["0003", 0],
        ["0004", 1]
      ],      
      showChart0:true,
      chartData1 : [ //totally unimportant what is here except for testing since in practice the chart data will be updated before the chart is ever displayed
        ["Year", "Sales"],
        ["0001", 1],
        ["0002", 1],
        ["0003", 0],
        ["0004", 1]
      ],      
        showChart1:true,
    }
  },

  methods: 
    {
    tester(){
      console.log('this button can be used to call a function to print stuff out for deubgging')
    },

    //this needs to be modified to call the server 5 times with one
    async getDataFromGoogleTrends(){
      //fiftyOverFifty indicates whether or not the product is trending
      var trendsObj0 = await this.callGoogleTrends(this.searchStr0)
      console.log(trendsObj0.chartData)
      this.chartData0 = trendsObj0.chartData
      this.showChart0 = true

      var trendsObj1 = await this.callGoogleTrends(this.searchStr1)
      console.log(trendsObj1.chartData)
      this.chartData1 = trendsObj1.chartData
      this.showChart1 = true
    },

    async callGoogleTrends(searchStr){
      console.log('searchStr', searchStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({searchStr:searchStr})
      }
      var response = await fetch('http://localhost:1337/googletrendsbackend',options)
      var {chartData, fiftyOverFifty} = await response.json()

      return {chartData, fiftyOverFifty}
    },

  },
}

function capFirstLetter(str){
  return str[0].toUpperCase()+str.substring(1)
}

</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
