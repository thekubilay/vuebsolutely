<template>
  <div id="app">
    <vb-sidebar :right="false" hoverExpand reduce>
      <button>this is a button</button>
    </vb-sidebar>


  </div>
</template>


<script>
import { ref, defineComponent } from 'vue';
import VbSidebar from "../src/lib-components/sidebar/VbSidebar.vue"
import {VbButton, VbDialog, VbLoading, VbCheckbox, VbSelect, } from "@/entry.esm";
// Uncomment import and local "components" registration if library is not registered globally.
// import { #3d3d3d } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {VbDialog, VbButton, VbCheckbox, VbLoading, VbSelect, VbSidebar},
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