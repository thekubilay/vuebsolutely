<template>
  <div id="app" style="height: 100vh" class="flex-column align-center justify-center">
    <vb-button @click="showDialog">Click me</vb-button>
    <vb-select v-model="container" title="物件名" radius="7px" width="200px" :options="options" />
    <vb-dialog medium :images="images" v-model="load" title="Imga" radius="10" directions>

    </vb-dialog>
    
  </div>
</template>


<script>
import {ref, defineComponent, watch} from 'vue';
import {VbButton, VbDialog,VbLoading, VbCheckbox, VbSelect} from "@/entry.esm";
import {VbDialogImage} from "../src/lib-components/dialog/VbDialogImage.vue"


// Uncomment import and local "components" registration if library is not registered globally.
// import { #3d3d3d } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {VbDialog,VbDialogImage, VbButton, VbCheckbox, VbLoading, VbSelect},
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
        src : "logo.png",
        alt : "description11"
      },
      {
        id : 2,
        src : "highpic.png",
        alt : "description2"
      },
      {
        id : 3,
        src : "widepic.png",
        alt : "description3"
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