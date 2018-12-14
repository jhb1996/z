/* eslint-disable */
<template>
  <div id="app" prop1="777777777">
    <!-- <button v-on:click="myCompChangeScrew()">'myCompChangeScrew'</button> -->
    <h1>top aliBaba products</h1>

<!-- <iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=productrese0c-20&language=en_US&marketplace=amazon&region=US&placement=B073WJTNH5&asins=B073WJTNH5&linkId=2c927c2ddcbc4921c0f081f9be5e01a6&show_border=true&link_opens_in_new_window=true"></iframe> -->
  
     <!-- margin width and height has no direct effect -->
  <div id=aliBabaProductSet>
    <div id=aliBabaProduct> 
      <img :src=aliBabaData[0].imgSrc>
      <h1>{{aliBabaData[0].productName}}</h1>
      <h1>{{aliBabaData[0].price}}</h1>
    </div>
    <div id=aliBabaProduct> 
      <img :src=aliBabaData[1].imgSrc>
      <h1>{{aliBabaData[1].productName}}</h1>
      <h1>{{aliBabaData[1].price}}</h1>
    </div>

    <div id=aliBabaProduct> 
      <img :src=aliBabaData[2].imgSrc>
      <h1>{{aliBabaData[2].productName}}</h1>
      <h1>{{aliBabaData[2].price}}</h1>
    </div>
  </div>
<!-- imag -->

  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    aliBabaData: {
      type: Array,
      default: [{productName:'placeholder', price:3.0, imgSrc:'//sc01.alicdn.com/kf/HTB1yhG9bOLaK1RjSZFxq6ymPFXaI/disposable-absorbent-catdog-urinate-pee-pads-mat.jpg_220x220.jpg'},{productName:'placeholder', price:3.0, imgSrc:'//sc01.alicdn.com/kf/HTB1yhG9bOLaK1RjSZFxq6ymPFXaI/disposable-absorbent-catdog-urinate-pee-pads-mat.jpg_220x220.jpg'},{productName:'placeholder', price:3.0, imgSrc:'//sc01.alicdn.com/kf/HTB1yhG9bOLaK1RjSZFxq6ymPFXaI/disposable-absorbent-catdog-urinate-pee-pads-mat.jpg_220x220.jpg'}],
    },
  },


  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
    }
  },
  methods: {
    myCompChangeScrew(){
      // alert('printProps pressed')
      console.log('this',this);
      console.log('this.prop1', this.prop1);
      console.log('this._props', this._props);
      this._props.screw = 'itchanged'
      console.log('this.data', this._data);

      console.log('this._props', this._props.screw)
      // console.log('data', _data);
      // console.log('props', props);
    },


    getAllScrew(){
      console.log('getAllScrew: this.screw',this.screw);
      return this._props// this.screw
      // return this.allData().dynamic()
    }



  },

};
</script>
