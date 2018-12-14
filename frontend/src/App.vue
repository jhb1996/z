/* eslint-disable */
<template>
  <div id="app">


    <h1>Type anything that you think might be trending</h1>
    <input v-model='searchStr' placeholder='enter your catagory'>


    <button v-on:click="getDataFromServerScrapers()">submit</button>
    <div> 
      <div></div>
      <button v-on:click="tester()">tester()</button>
    </div>
    <router-view v-if="showChart" class="view two" name="googleChartVue" :myChartData=chartData></router-view>

    <h1 v-if="showAliExpress">top AliExpress products</h1>
    <router-view v-if="showAliExpress" class="view five" name="listProductsVue" :products=aliExpressProductLst></router-view>
    <h1 v-if="showAliBaba">top AliBaba products</h1>
    <router-view v-if="showAliBaba" class="view three" name="listProductsVue" :products=aliBabaProductLst></router-view>
    <h1 v-if="showAmazon">top Amazon products</h1>
    <router-view v-if="showAmazon" class="view five" name="listProductsVue" :products=amazonProductLst></router-view>
  </div>
</template>

<script>
// var Product = require ('@/classes/classes')
// var Product = require('@/../../sharedFrontAndBack/classes/product').Product
import p from '@/../../sharedFrontAndBack/classes/product'
var Product = p.Product
export default {
  
  /* eslint-disable */
  name: 'App',

  localData: {//doesn't seem to be accesible outside the innitial loadup
    startupvariable: 'd1'
  },
  data() {
      return {
      searchStr: 'potato hat',
      chartData : [
        ["Year", "Sales"],
        ["0001", 1],
        ["0002", 1],
        ["0003", 0],
        ["0004", 1]
      ],
        showChart:false,

        showAmazon:false,

        showAliBaba:false,
        showAliExpress:false,

        aliBabaProductLst: [new Product()],//[new Product(name='aliBaba placeholder'),new Product(), new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product()],
        aliExpressProductLst: [new Product()],//[new Product(name='aliExpress placeholder'),new Product(), new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product()],
        amazonProductLst: [new Product()],//[new Product(name='aliExpress placeholder'),new Product(), new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product()],
    }
  },

  methods: 
    {
    tester(){
      console.log(new Product())
      console.log(new Product(productName='aliBaba Placeholder'))
    },

    async getDataFromServerScrapers(){
      this.callGoogleTrends()
      this.callServerScraper('aliBaba',this.searchStr)
      this.callServerScraper('aliExpress',this.searchStr)
      this.callServerScraper('amazon',this.searchStr)
    },

    async callGoogleTrends(){
      console.log('searchStr', this.searchStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({searchStr:this.searchStr})
      }
      var response = await fetch('http://localhost:1337/googletrendsbackend',options)
      var {chartData, fiftyOverFifty} = await response.json()
      // console.log(chartData)
      this.chartData = chartData
      this.showChart = true
    },

    // async callAmazon(){
    //   console.log('calling amazon with searchStr', this.searchStr)

    //   var options = {
    //     method: 'POST',
    //     // mode: 'no-cors'
    //     //headers {
    //     //   'Accept': 'application/json',
    //     //   'Content-Type': 'application/json'
    //     // },
    //     body: JSON.stringify({searchStr:this.searchStr})
    //   }
    //   var response = await fetch('http://localhost:1337/amazonbackend',options)
      
    //   console.log('amazonresponse',response)
    //   var amazonObjLst = await response.json()
    //   console.log('amazonObjLst',amazonObjLst)
    //   console.log('amazonObjLst[0]',amazonObjLst[0])
    //   this.amazonData = amazonObjLst
    //   this.showAmazon = true
    // },

    async callServerScraper(site, searchStr){
      console.log('calling scraper on ' + site + ' with searchStr', searchStr)
      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({site:site,searchStr:searchStr})
      }
      var response = await fetch('http://localhost:1337/scraper',options)
      
      console.log('scraper response:',response)
      var productObjLst = await response.json()
      console.log('productObjLst', productObjLst) 
      var productLst = prepareDataForListProductsVue(productObjLst )
      console.log('productLst',productLst)
      console.log('product[0]',productLst[0])

      this[site+'ProductLst'] = productLst
      this['show'+capFirstLetter(site)] = true
    },

    async callAliExpress(){
      console.log('calling AliExpress with searchStr', this.searchStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({searchStr:this.searchStr})
      }
      var response = await fetch('http://localhost:1337/aliexpressbackend',options)
      var aliExpressObjLst = await response.json()
      console.log('aliExpressObjLst:', aliExpressObjLst)
      var aliExpressProductLst = prepareDataForListProductsVue(aliExpressObjLst)
      console.log('aliExpressProductLst',aliExpressProductLst)
      console.log('AliExpressObjLst',aliExpressObjLst)
      console.log('AliExpressObjLst[0]',aliExpressObjLst[0])
      this.aliExpressProductLst = aliExpressProductLst
      this.showAliExpress = true
    },

    //takes data returned from the server and preps it to be shown

    changeChart () {
        console.log('changeScrew: this', this)
        console.log('changeScrew: this._data', this._data)
        console.log('changeScrew: this._data', this.data)
      }
  },
}

function prepareDataForListProductsVue(serverData){
  console.log('data gotten from server =', serverData)
  var productLst = []
  console.log('serverData.length', serverData.length)
  for (var i=0; i<serverData.length; i++){
    var serverObj = serverData[i]
    // {productName: productName, priceFloat:priceFloat, link:link, imgSrc:imgSrc}
    var product = new Product(serverObj)
//       var product = new Product({productName: serverObj.productName, imgSrc: serverObj.imgSrc,
// fullName: serverObj.fullName, priceFloat: serverObj.priceFloat, link: serverObj.link,
// specialName1: serverObj.specialName1, specialValue1: serverObj.specialValue1,
// specialName2: serverObj.specialName2, specialValue2: serverObj.specialValue2})
    console.log('product' ,product)
    productLst.push(product) 
    console.log('productLst:', productLst)

  }
  console.log('productLst:', productLst)
  return productLst
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
