<template>
  <button class="vb-button relative" :style="styles">
    <transition name="fade">
      <span v-if="!loading" class="context relative flex align-center justify-center">
        <slot></slot>
      </span>
      <vb-loading v-else :loading="loading" absolute :fill="bgColor" />
    </transition>
  </button>
</template>

<script>
import {reactive, watch} from "vue";
import helpers from "@/lib-components/button/helpers";
import VbLoading from "@/lib-components/loading/VbLoading";
export default {
  name: "VbButton",
  components: {VbLoading},
  props:{
    loading:Boolean,
    width:String,
    height: String,
    bgColor: String,
    textColor: String,
    border: String,
    radius: String,
    dashed: Boolean,

  },
  setup(props, ){
    const styles = reactive({
      width: props.width,
      height: props.height,
      color: props.textColor,
      backgroundColor: props.bgColor,
      borderWidth: props.border ? props.border+"px" : false,
      borderColor: props.border ? props.bgColor : false,
      borderStyle: props.border && props.dashed ? "dashed" : +"solid",
      borderRadius: props.radius ? props.radius+"px" : false,
    })

    watch(() => props.width, (val) => {
      styles.width = val ? val : false
    })
    watch(() => props.height, (val) => {
      styles.height = val ? val : false
    })
    watch(() => props.textColor, (val) => {
      styles.color = val
    })
    watch(() => props.bgColor, (val) => {
      styles.backgroundColor = val
    })
    watch(() => props.border, (val) => {
      styles.borderWidth = val ? val+"px" : false
    })
    watch(() => props.dashed, (val) => {
      styles.borderStyle = val && props.border ? "dashed" : false
    })
    watch(() => props.radius, (val) => {
      styles.borderRadius = val ? val+"px" : false
    })

    return {
      styles
    }
  }

}
</script>

<style>
.vb-button {
  overflow: hidden;
  width: 100px;
  height: 38px;
  color: #3d3d3d;
}
.vb-button > span.context {
  z-index: 1;
}
</style>