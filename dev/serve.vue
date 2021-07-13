<template>
  <div id="app" style="height: 100vh" class="flex-column align-center justify-center">
    <vb-select v-model="container" title="物件名" radius="7px" width="200px" :options="options" />
  </div>
</template>


<script>
import {ref, defineComponent, watch} from 'vue';
import {VbButton, VbDialog, VbLoading, VbCheckbox, VbSelect} from "@/entry.esm";
// Uncomment import and local "components" registration if library is not registered globally.
// import { #3d3d3d } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {VbDialog, VbButton, VbCheckbox, VbLoading, VbSelect},
  setup(){
    const load = ref(false)
    const container = ref([])
    const options = ref([
      "data1",
      "data2",
      "data3",
      "data4",
      "data5",
      "data6",
    ])

    return {
      load, options, container,
    }
  }
});
</script>