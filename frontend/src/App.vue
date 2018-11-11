/* eslint-disable */
<template>
  <div id="app">

    <!-- experimenting with amazon linking -->
    <!-- <a href="https://www.amazon.com/gp/product/B00513J04I/ref=as_li_ss_il?ie=UTF8&th=1&linkCode=li2&tag=productrese0c-20&linkId=648f5cfac90e50b3aedad756d2faffe3&language=en_US" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00513J04I&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=productrese0c-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=productrese0c-20&language=en_US&l=li2&o=1&a=B00513J04I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> -->

    <h1>Type anything that you think might be trending</h1>
    <input v-model='inputStr' placeholder='enter your catagory'>


    <button v-on:click="callGoogleTrends()">submit</button>
    <div> 
      <div></div>
      <button v-on:click="tester()">tester()</button>
    </div>
    <router-view v-if="showChart" class="view two" name="googleChartVue" :myChartData=chartData></router-view>

    <router-view v-if="showAmazon" class="view three" name="amazonVue" :amazonData=amazonData></router-view>


    <!-- <router-view class="view four" name="myComp"></router-view>
    <router-view class="view five" name="myComp2"></router-view> -->



    <!-- <button v-on:click="goBack()">app button</button> -->

    <!-- <ul>
      <li>
        <router-link to="/">/</router-link>
      </li>
      <li>
        <router-link to="/other">/other</router-link>
      </li>
    </ul> -->
    


    <!-- <router-view class="view one" ></ router-view> -->
    <!-- chart is above -->
    <!-- <router-view class="view three" name="paypalView"></router-view> -->
   
    <!-- <img src="./assets/logo.png"> -->


  </div>
</template>

<script>
export default {
  
  /* eslint-disable */
  name: 'App',

  localData: {//doesn't seem to be accesible outside the innitial loadup
    d: 'd1'
  },
  data() {

      return {
      inputStr: 'potato',
      chartData : [
        ["Year", "Sales"],
        ["0001", 1],
        ["0002", 1],
        ["0003", 0],
        ["0004", 1]
      ],
        showChart:false,

        showAmazon:false,

        amazonData:[{stripeSrc:"//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=\
1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&\
tracking_id=productrese0c-20&language=en_US&marketplace=amazon&region=US&placement=\
B076C5YVCK&asins=B076C5YVCK&linkId=773c8967780d517a7b83b3d4e573a238&show_border=true&\
link_opens_in_new_window=true"},{stripeSrc:"//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=\
1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&\
tracking_id=productrese0c-20&language=en_US&marketplace=amazon&region=US&placement=\
B076C5YVCK&asins=B076C5YVCK&linkId=773c8967780d517a7b83b3d4e573a238&show_border=true&\
link_opens_in_new_window=true"},{stripeSrc:"//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=\
1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&\
tracking_id=productrese0c-20&language=en_US&marketplace=amazon&region=US&placement=\
B076C5YVCK&asins=B076C5YVCK&linkId=773c8967780d517a7b83b3d4e573a238&show_border=true&\
link_opens_in_new_window=true"}],
        // counter:3,
      }
  },

  methods: {
    async callGoogleTrends(){
      console.log('inputStr', this.inputStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({inputStr:this.inputStr})
      }
      var response = await fetch('http://localhost:1337/googletrendsbackend',options)
      var {chartData, fiftyOverFifty} = await response.json()
      // console.log(chartData)
      this.chartData = chartData
      this.showChart = true
      this.callAmazon()
    },

    async callAmazon(){
      console.log('calling amazon with inputStr', this.inputStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({inputStr:this.inputStr})
      }
      var response = await fetch('http://localhost:1337/amazonbackend',options)
      
      console.log('amazonresponse',response)
      var amazonObjLst = await response.json()
      console.log('amazonObjLst',amazonObjLst)
      console.log('amazonObjLst[0]',amazonObjLst[0])
      this.amazonData = amazonObjLst
      this.showAmazon = true
    },

    async callAliExpress(){
      console.log('calling AliExpress with inputStr', this.inputStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({inputStr:this.inputStr})
      }
    var response = await fetch('http://localhost:1337/aliexpressbackend',options)
    responseObj = await response.json()
    console.log('responseObj',responseObj)
    },
    goBack () {
      console.log('this', this)
      console.log('this', this.goBack)
      console.log('this', this.showChart)
      console.log('this', this.potato)
      console.log('this', this._data)
      console.log('this', this.data)
      console.log('this.googleChartVue', this.googleChartVue)
      console.log('this', this._routerViewCache.googleChartVue)
      console.log('this', this.routerViewCache)
      console.log('this', this.props)
      console.log('this', this._props)
      console.log('this', this.prop1)
      console.log('this', this._prop1)
      // window.history.length
      },
      changeChart () {
        console.log('changeScrew: this', this)
        console.log('changeScrew: this._data', this._data)
        console.log('changeScrew: this._data', this.data)
      }
  }
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
