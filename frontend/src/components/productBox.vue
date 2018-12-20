 <template>
  <ul class="listOfproducts">
    <!-- <button v-on:click="tester()">tester()</button> -->
    <li class=productBox>
      <a :href="product.link"><img :src="prepImgSrc(product.imgSrc)" alt="" @click="openLink(product.link)"></a>

        <h2 class="product-name"
            @click="openLink(product.link)">
          {{ cutName(product.productName) }}
        </h2>
      <div class="product-price">
        <span>{{ prepPrice(product.priceFloat) }}</span> 
        <span>  {{product.specialName1}} {{product.specialValue1}} </span> 
        <!-- <span> other thing </span> -->
      </div>
    </li>
  </ul>
</template>

<script>
import p from '@/../../sharedFrontAndBack/classes/product'
var Product = p.Product
console.log(Product)
export default {
  props: {
      product: {
        type: Product,
        default: {//defualts are ignored in any case when data is passed to the component
          productName: 'default (productBox)',
          fullName: 'defaultFullName',
          imgSrc: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          priceFloat: 1.00,
          link: 'yahoo.com',
          specialName1: 'default Special Name1',
          specialValue1: 111111,
          specialName2: 'default Special Name2', //currently unused
          specialValue2: 111111,
          },
      },
    },

  methods: {
    //cuts the name down to the appropriate size to be shown
    tester(name){
      console.log('--tester')
      console.log(this.product.imgSrc)
    },
    cutName(name){
      var cut = name.substring(0,30)+'...'
      // if (cut.length<80){cut=cut+'\n'}
      return cut
    },
    prepImgSrc(imgSrc){
      // if (imgSrc!=){
      //   return imgSrc
      // }
      // else
      return imgSrc
    },
    prepPrice(price){
      var priceString = price.toString()
      var decimalIdx = priceString.indexOf('.')
      if (decimalIdx!=-1){
        priceString = priceString.substring(0,decimalIdx+3)
      }
      if (decimalIdx===priceString.length-2){
        priceString = priceString+'0'
      }
      return '$'+priceString
    },
    openLink(link){
      window.open(this.product.link, "_blank");    
    }
  },
};
</script>

<style scoped>
    img {
      width: 150px;
      height:150px;
      border-radius: 2px;
      box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
      transition: width 1s;
    }
    img:hover {
      cursor: pointer;
    }

  .productBox {
    width: 300px;
    background-color: #fff;
    list-style: none;
    box-sizing: border-box;
    padding: 0em;
    margin: 0em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px;
    border-style: outset;
  }
  .product-name {
    font-size: 1.2em;
    font-weight: normal;
  }
  .product-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .product-price {
    width: 100%;
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
  }
</style>