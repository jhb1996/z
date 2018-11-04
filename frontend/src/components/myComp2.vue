/* eslint-disable */
<template>
  <div id="app" prop1="777777777">
    <!-- <button v-on:click="myCompChangeScrew()">'myCompChangeScrew'</button>
    <h1> print f {{ screw }} </h1> -->

  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    prop1: {
      type: String,
      default: 'Vue!'
    },
    screw: {
      type: String,
      default: 'defaultScrew'
    },
    allData: {
      type: String,
      default: 'allData'
    },

  },

  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      b: 'b1',
      screw: 'dddddd',
    };
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
