<script>
import { ref, defineComponent } from 'vue';
import {VbButton, VbDialog, VbLoading, VbCheckbox} from "@/entry.esm";
// Uncomment import and local "components" registration if library is not registered globally.
// import { #3d3d3d } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {VbDialog, VbButton, VbCheckbox, VbLoading},
  setup(){
    const load = ref(false)
    return{load}
  }
});
</script>

<template>
  <div id="app">
    <vb-dialog medium v-model="load" title="some title" radius="10">
      <vb-loading absolute v-model="load" />
    </vb-dialog>

    <vb-button @click="load = !load"
               width="300px" bg-color="blue" text-color="white" radius="35" >test</vb-button>
  </div>
</template>
