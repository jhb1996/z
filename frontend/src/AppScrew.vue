/* eslint-disable */
<template>
  <div id="app">
<!-- <img class="picCore pic-Core-v" src="//ae01.alicdn.com/kf/HTB1LTD6GpmWBuNjSspdq6zugXXa4/Rabbit-Fur-Keychain-Bunny-Rabbit-Fur-Fashion-Pom-Pom-Keychain-Bunny-Toy-Rabbit-Keychain-14-cm.jpg_220x220.jpg" 
alt="Rabbit Fur Keychain Bunny Rabbit Fur Fashion Pom Pom Keychain Bunny Toy Rabbit Keychain 14 cm Tote Car Charm Pendant(China)"> 
     -->
    
    <h1>Screw</h1>

  <div id="app" class="columns">
    <div class="column">
      <router-view class="view two" name="listProductsVue" :products=products></router-view>

      <!-- <router-view class="view two" v-for="product in products"  name="listProductsVue" :product=product :key=product.id+3></router-view> -->

      <!-- <router-view class="view two" v-for="product in products"  name="productComponent" :product=product :key=product.id+3></router-view> -->
      <!-- <productComponent v-for="product in products" :product=product :key=product.id> </productComponent> -->


      <div id="app" class="columns">
        <div class="column">
        </div>
      </div>
    </div>
  </div>
  </div>
</template> 

<script>
export default {
  
  /* eslint-disable */
  name: 'App',

  localData: {//doesn't seem to be accesible outside the innitial loadup
    loadupvariable: 'd1'
  },

  data() {

      return {
        products: [{
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


  methods: {
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
