 <template>
  <ul class="listOfproducts">
    <li :key="index" class=productBox>
      <img :src="product.img" alt="" @click="openLink(product.link)">

<!-- alt="thumbnail" class="blg-post-tile-image" style="opacity: 1;"> -->

        <h2 class="product-name"
            @click="openLink(product.link)">
          {{ cutName(product.name) }}
        </h2>
      <div class="product-price">
        <span> price {{ product.price }} </span> 
        <span> {{product.specialName1}} {{product.specialValue1}} </span> 
        <span> other thing </span>
      </div>
    </li>
  </ul>
</template>

<script>
// import { mapActions } from 'vuex';
// import btn from './Btn';
export default {
  props: {
      product: {
        type: Object,
        default: {
          name: 'default',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          price: 1.00,
          link: 'yahoo.com',
          specialName1: 'default Special Name1',
          specialValue1: 111111,
          specialName2: 'default Special Name2', //currently unused
          specialValue2: 111111,
          },
      },
    },
  //   components: {
  //   // btn,
  // },
  methods: {
    //cuts the name down to the appropriate size to be shown
    cutName(name){
      return name.substring(0,70)+'...'
    },
    openLink(link){
      window.open(this.products[0].link, "_blank");    
    }
  },
};
</script>

<style scoped>
    img {
      width: 150px;
      border-radius: 2px;
      box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
      transition: width 1s;
    }
    img:hover {
      cursor: pointer;
    }

  .listOfproducts {
    width: 100%;
    /* max-width: 1000px; */
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
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