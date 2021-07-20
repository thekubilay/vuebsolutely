<template>
  <img class="vb-image" @load="isLoaded" ref="image" :src="src" :style="resized" alt="image">
</template>

<script>
import {onMounted, ref, watch} from "vue";
import useImageResizeHandler from "@/helpers/useImageResizeHandler";
export default {
  name: "VbImage",
  props:{
    src:String,
    width:{
      type:String,
    },
    height:{
      type:String,
    }
  },
  setup(props,){
    const {image, resized, useSizer} = useImageResizeHandler()

    onMounted(() => {
      if (!props.width && !props.height) {
        useSizer(image.value, "100%")
      }
      else {
        resized.width = props.width
        resized.height = props.height
      }
    })

    const isLoaded = () => {
      if (!props.width && !props.height)
        useSizer(image.value, "100%")
      else {
        resized.width = props.width
        resized.height = props.height
      }

    }

    watch(() => props.src, (val) => {
      if (!props.width && !props.height)
        useSizer(image.value, "100%")
      else {
        resized.width = props.width
        resized.height = props.height
      }
    })

    watch(() => props.width, (val) => {
      resized.width = val
    })

    watch(() => props.height, (val) => {
      resized.height = val
    })

    return {
      image, resized,
      isLoaded,
    }
  }
}
</script>

<style>
.vb-image {
  margin: auto;
}
</style>