/* eslint-disable */
<template>
  <div class="product">
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
  </div>  
</template>

<script>
export default {
  name: "productcomponent_Name",
  props: {
    product: {
      type: Object,
      default: {
        id: 1,
        name: 'default',
        handle: '@default',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        product: "default product",
        likes: 10,
        },
    }
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
