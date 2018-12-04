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
    <!-- <li v-for="(fruit, index) in fruits" :key="`fruit-${index}`"></li> -->

          <!-- <productComponent v-for="product in products" :product=product :key=d /> -->
          <!-- <productComponent :product="products[1]"/> -->
        </div>
      </div>

      <!-- <router-view class="view two" name="productComponent" v-for="product in products" :product="product"></router-view> -->

      <!-- <productComponent v-for="product in products" :product="product"/> -->
    </div>
  </div>


        <!-- <router-view class="view two" name="productComponent" :product=products[1]></router-view> -->

    <!-- <div id="app" class="columns">
      <div class="column">
        <product-component v-for="product in products" :product="product"/>
      </div>
    </div> -->

<!-- <div class="product">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="product.img" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{product.name}}</strong> <small>{{product.handle}}</small>
                <br>
                {{product.product}}
              </p>
            </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-heart"></i></span>
                  <span class="likes">{{product.likes}}</span>
                </a>
              </div>
          </div>
        </article>
      </div>
    </div>  -->

  </div>
</template> 

<script>
// import productComponent from './components/productComponent'


export default {
  
  /* eslint-disable */
  name: 'App',

  localData: {//doesn't seem to be accesible outside the innitial loadup
    loadupvariable: 'd1'
  },

  data() {

      return {
        products: [{
          id: 1,
          name: 'default1',
          handle: '@default1',
          img: "https://placeimg.com/200/200/arch",
          product: "default product1",
          likes: 10,
          },
          {
          id: 1,
          name: 'default2',
          handle: '@default2',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          product: "default product2",
          likes: 10,
          },
          {
          id: 1,
          name: 'default3',
          handle: '@default3',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          product: "default product3",
          likes: 10,
          },{
          id: 1,
          name: 'default1',
          handle: '@default1',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          product: "default product1",
          likes: 10,
          },
          {
          id: 1,
          name: 'default2',
          handle: '@default2',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          product: "default product2",
          likes: 10,
          },
          {
          id: 1,
          name: 'default3',
          handle: '@default3',
          img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          product: "default product3",
          likes: 10,
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
