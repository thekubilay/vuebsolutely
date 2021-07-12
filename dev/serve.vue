<template>
  <div id="app">
    <vb-dialog medium v-model="load" title="some title" radius="10">
      <vb-loading absolute v-model="load" />
    </vb-dialog>

    <vb-checkbox v-model="load" />

    <vb-select border="2px" radius="7px" width="200px" :options="options" bg-color="#f5f6fa" />

<!--    <vb-button @click="load = !load"-->
<!--               width="300px" bg-color="blue" text-color="white" radius="35" >test</vb-button>-->
  </div>
</template>


<script>
import { ref, defineComponent } from 'vue';
import {VbButton, VbDialog, VbLoading, VbCheckbox, VbSelect} from "@/entry.esm";
// Uncomment import and local "components" registration if library is not registered globally.
// import { #3d3d3d } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {VbDialog, VbButton, VbCheckbox, VbLoading, VbSelect},
  setup(){
    const load = ref(false)
    const options = ref([
        "data1",
        "data2",
        "data3",
        "data4",
        "data5",
        "data6",
        "data7",
        "data8",
    ])
    return {
      load, options
    }
  }
});
</script>