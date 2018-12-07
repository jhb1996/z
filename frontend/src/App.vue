/* eslint-disable */
<template>
  <div id="app">

    <!-- experimenting with amazon linking -->
    <!-- <a href="https://www.amazon.com/gp/product/B00513J04I/ref=as_li_ss_il?ie=UTF8&th=1&linkCode=li2&tag=productrese0c-20&linkId=648f5cfac90e50b3aedad756d2faffe3&language=en_US" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00513J04I&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=productrese0c-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=productrese0c-20&language=en_US&l=li2&o=1&a=B00513J04I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> -->

<!-- image example  -->


<!-- <img class="picCore pic-Core-v" src="//ae01.alicdn.com/kf/HTB1LTD6GpmWBuNjSspdq6zugXXa4/Rabbit-Fur-Keychain-Bunny-Rabbit-Fur-Fashion-Pom-Pom-Keychain-Bunny-Toy-Rabbit-Keychain-14-cm.jpg_220x220.jpg" 
alt="Rabbit Fur Keychain Bunny Rabbit Fur Fashion Pom Pom Keychain Bunny Toy Rabbit Keychain 14 cm Tote Car Charm Pendant(China)"> 
    
     -->
    <h1>Type anything that you think might be trending</h1>
    <input v-model='inputStr' placeholder='enter your catagory'>


    <button v-on:click="getDataFromScraperServer()">submit</button>
    <div> 
      <div></div>
      <button v-on:click="tester()">tester()</button>
    </div>
    <router-view v-if="showChart" class="view two" name="googleChartVue" :myChartData=chartData></router-view>
    
    <!-- <h1>top aliBaba products</h1> -->
    <router-view v-if="showAmazon" class="view three" name="amazonVue" :amazonData=amazonData></router-view>
    <!-- <router-view v-if="showAliBaba" class="view three" name="aliBabaVue" :aliBabaProductLst=aliBabaProductLst></router-view> -->

    <h1>top aliBaba products</h1>
    <router-view v-if="showAliBaba" class="view three" name="listProductsVue" :products=aliBabaProductLst></router-view>
    
    <h1>top aliExpress products</h1>
    <router-view v-if="showAliExpress" class="view five" name="listProductsVue" :products=aliExpressProductLst></router-view>

    <router-view class="view test" name="listProductsVue" :products=products></router-view>



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
// var Product = require ('@/classes/classes')
import Classes from '@/classes/classes'
var Product = Classes.Product
export default {
  
  /* eslint-disable */
  name: 'App',

  localData: {//doesn't seem to be accesible outside the innitial loadup
    startupvariable: 'd1'
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

        showAliBaba:false,
        showAliExpress:false,

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
      aliBabaProductLst: [new Product(name='aliBaba placeholder'),new Product(), new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product()],
      aliExpressProductLst: [new Product(name='aliExpress placeholder'),new Product(), new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product()],

      // aliBabaProductLst: [{productName:'placeholder', price:3.0, imgSrc:'//sc01.alicdn.com/kf/HTB1yhG9bOLaK1RjSZFxq6ymPFXaI/disposable-absorbent-catdog-urinate-pee-pads-mat.jpg_220x220.jpg'},{productName:'placeholder', price:3.0, imgSrc:'//sc01.alicdn.com/kf/HTB1yhG9bOLaK1RjSZFxq6ymPFXaI/disposable-absorbent-catdog-urinate-pee-pads-mat.jpg_220x220.jpg'},{productName:'placeholder', price:3.0, imgSrc:'//sc01.alicdn.com/kf/HTB1yhG9bOLaK1RjSZFxq6ymPFXaI/disposable-absorbent-catdog-urinate-pee-pads-mat.jpg_220x220.jpg'}],
      // a: new Product(),
      products: [new Product(name='generic placeholder'),new Product(), new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product(),new Product()]
      // products: [{
      //     name: 'default (listProductsVue)',
      //     img: "https://placeimg.com/200/200/arch",
      //     fullName: "default fullName ((listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },
      //     {
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },
      //     {
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },{
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },
      //     {
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },
      //     {
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },{
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },{
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },{
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },{
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     },{
      //     name: 'default (listProductsVue)',
      //     img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      //     fullName: "default fullName (listProductsVue)",
      //     price: 1.00,
      //     link: 'yahoo.com',
      //     specialName1: 'default Special Name1',
      //     specialValue1: 222222,
      //     specialName2: 'default Special Name2',
      //     specialValue2: 222222,
      //     }],
    }
  },

  methods: 
    {
    tester(){
      console.log(new Product())
    },

    async getDataFromScraperServer(){
      this.callGoogleTrends()
      this.callAliBaba()
      this.callAliExpress()
    },

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

    async callAliBaba(){
      console.log('calling AliBabaBackened with inputStr', this.inputStr)

      var options = {
        method: 'POST',
        // mode: 'no-cors'
        //headers {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({inputStr:this.inputStr})
      }
      var response = await fetch('http://localhost:1337/alibababackend',options)
      
      console.log('AliBabaresponse',response)
      var aliBabaObjLst = await response.json()
      var aliBabaProductLst = this.prepareDataForListProductsVue(aliBabaObjLst)
      console.log('aliBabaProductLst',aliBabaProductLst)
      console.log('AliBabaObjLst',aliBabaObjLst)
      console.log('AliBabaObjLst[0]',aliBabaObjLst[0])
      this.aliBabaProductLst = aliBabaProductLst
      this.showAliBaba = true
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
      var aliExpressObjLst = await response.json()
      console.log('aliExpressObjLst:', aliExpressObjLst)
      var aliExpressProductLst = this.prepareDataForListProductsVue(aliExpressObjLst)
      console.log('aliExpressProductLst',aliExpressProductLst)
      console.log('AliExpressObjLst',aliExpressObjLst)
      console.log('AliExpressObjLst[0]',aliExpressObjLst[0])
      this.aliExpressProductLst = aliExpressProductLst
      this.showAliExpress = true
    },

    prepareDataForListProductsVue(serverData){
      console.log('data gotten from server =', serverData)
      var productLst = []
      console.log('serverData.length', serverData.length)
      for (var i=0; i<serverData.length; i++){
        var serverObj = serverData[i]
        // {productName: productName, priceFloat:priceFloat, link:link, imgSrc:imgSrc}
        var product = new Product(serverObj.productName, serverObj.imgSrc, serverObj.fullName, serverObj.priceFloat, serverObj.link, "", "", serverObj.specialName2, serverObj.specialValue2)
        console.log('product' ,product)
        productLst.push(product) 
        console.log('productLst:', productLst)

      }
      console.log('productLst:', productLst)
      return productLst
    },

    //takes data returned from the server and preps it to be shown

    changeChart () {
        console.log('changeScrew: this', this)
        console.log('changeScrew: this._data', this._data)
        console.log('changeScrew: this._data', this.data)
      }
  },
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
