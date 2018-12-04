 <template>
 <!-- for a sliding scale implementation https://codepen.io/jrvaja/pen/qoLXZb - need to change some of the css to flex -->

<div id="app">
  <!-- changing section to ul creates an offset from the first card -->
    <section class="productScroller">
      <productBox v-for="(product, index) in products" :product=product :key="index" class="productBox"/>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: [{
        id: 2,
        name: 'default (listProductsVue)',
        img: "https://placeimg.com/200/200/arch",
        fullName: "default fullName ((listProductsVue)",
        price: 1.00,
        link: 'yahoo.com',
        specialName1: 'default Special Name1',
        specialValue1: 222222,
        specialName2: 'default Special Name2',
        specialValue2: 222222,
        },
        {
        id: 2,
        name: 'default (listProductsVue)',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        fullName: "default fullName (listProductsVue)",
        price: 1.00,
        link: 'yahoo.com',
        specialName1: 'default Special Name1',
        specialValue1: 222222,
        specialName2: 'default Special Name2',
        specialValue2: 222222,
        },
        {
        id: 2,
        name: 'default (listProductsVue)',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        fullName: "default fullName (listProductsVue)",
        price: 1.00,
        link: 'yahoo.com',
        specialName1: 'default Special Name1',
        specialValue1: 222222,
        specialName2: 'default Special Name2',
        specialValue2: 222222,
        },{
        id: 2,
        name: 'default (listProductsVue)',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        fullName: "default fullName (listProductsVue)",
        price: 1.00,
        link: 'yahoo.com',
        specialName1: 'default Special Name1',
        specialValue1: 222222,
        specialName2: 'default Special Name2',
        specialValue2: 222222,
        },
        {
        id: 2,
        name: 'default (listProductsVue)',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        fullName: "default fullName (listProductsVue)",
        price: 1.00,
        link: 'yahoo.com',
        specialName1: 'default Special Name1',
        specialValue1: 222222,
        specialName2: 'default Special Name2',
        specialValue2: 222222,
        },
        {
        id: 2,
        name: 'default (listProductsVue)',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        fullName: "default fullName (listProductsVue)",
        price: 1.00,
        link: 'yahoo.com',
        specialName1: 'default Special Name1',
        specialValue1: 222222,
        specialName2: 'default Special Name2',
        specialValue2: 222222,
        }],
      }
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
  .listOfproducts {
    width: 100%;
    max-width: 10000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }

.productScroller {
  display: flex;
  background-color: #2c3e;
  /* min-width: 100%; */
  /* min-height: 200px; */
  /* margin: 0px; */
  overflow-x: auto;
}

/*not sure what this does*/
.productScroller::-webkit-scrollbar {
  display: flex;
}


</style>

