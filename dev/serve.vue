<template>
  <div id="app" style="height: 100vh" class="flex-column align-center justify-center">
    <vb-button @click="showDialog">Click me</vb-button>
    <vb-select v-model="container" title="物件名" radius="7px" width="200px" :options="options" />
    <vb-dialog medium v-model="load" title="title" radius="10px" width="500px" height="400px">
      <vb-image :src="images[1].src" />
    </vb-dialog>
    <vb-image-slider :images="images" tnmargin="2px" directions>

    </vb-image-slider>
  </div>
</template>


<script>
import {ref, defineComponent, watch} from 'vue';
import {VbButton, VbDialog,VbLoading, VbCheckbox, VbSelect, VbImage, VbImageSlider} from "@/entry.esm";



// Uncomment import and local "components" registration if library is not registered globally.
// import { #3d3d3d } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {VbDialog, VbButton, VbCheckbox, VbLoading, VbSelect, VbImage, VbImageSlider},
  setup(){
    const load = ref(true)
    const container = ref([])
    const options = ref([
      "data1",
      "data2",
      "data3",
      "data4",
      "data5",
      "data6",
    ])
    const images = ref([
      {
        id : 1,
        src : require("../src/assets/logo.png"),
      },
      {
        id : 2,
        src : require("../src/assets/highpic.png"),
      },
      {
        id : 3,
        src : require("../src/assets/widepic.png"),
      }]

    )
    const showDialog = ()=>{
      load.value = true
    }
    return {
      load, options, container, images, showDialog
    }
  }
});
</script>