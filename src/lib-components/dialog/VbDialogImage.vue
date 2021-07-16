<template>
  <div class="image"   :style="styles" >

  </div>
</template>

<script>
import {computed, reactive, ref, watch} from "vue";

export default {
  name: "VbDialog",
  components: {VbButton},
  props: {
    image : {
      Type : String,
      require : true
    },
    width : String,
    height : String,
  },
  setup(props, {emit}) {
    const styles = {
      width : props.width,
      height : props.height,
      backgroundImage : props.image? 'url('+props.image+')': false,
      //not necessary, but failsafe if no image found
      backgroundColor : "#444444", 
    }
    return {
      styles
    }
  }
}
</script>

<style scoped>
.image {
  background-position: center;
}
</style>